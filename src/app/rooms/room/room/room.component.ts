import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignalRService } from 'src/app/services/SignalR/signal-r.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { SignalRMethod } from 'src/app/services/SignalR/SignalRMethod';
import { RoomsService } from 'src/app/services/http/rooms.service';
import { Room } from 'src/app/models/Room';
import { User } from 'src/app/models/User';
import { BuzzResult } from 'src/app/models/BuzzResult';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
	public hasJoined: boolean = false;
	public username: string;
	public roomPassword: string;
	public room: Room;
	public buzzResult: BuzzResult;
	public shouldDisplayRoomClosedModal: boolean = false;
	public shouldDisplayIncorrectPasswordPrompt: boolean = false;

	private _roomId: number;

	constructor(private route: ActivatedRoute, private _signalRService: SignalRService,
		private _roomsService: RoomsService, private spinner: NgxSpinnerService, private toastr: ToastrService,
		private _storageService: StorageService) {

		_signalRService.onMethod(SignalRMethod.UserJoinRoomSuccess, async () => await this.onJoinSuccess());
		_signalRService.onMethod(SignalRMethod.UserJoinRoomFail, (message) => this.onJoinFail(message));
		_signalRService.onMethod(SignalRMethod.UserJoinedRoom, (user) => this.onUserJoin(user));
		_signalRService.onMethod(SignalRMethod.UserLeftRoom, (userId) => this.onUserLeave(userId));
		_signalRService.onMethod(SignalRMethod.UserUpdatedName, (userId, newUsername) => this.onUserUpdatedName(userId, newUsername));
		_signalRService.onMethod(SignalRMethod.BuzzerPressed, (user, buzzResult) => this.onBuzzerPressed(user, buzzResult));
		_signalRService.onMethod(SignalRMethod.BuzzerPressSuccess, (buzzResult) => this.onBuzzPressResponse(buzzResult))
		_signalRService.onMethod(SignalRMethod.ScoresCleared, () => this.onScoresCleared());
		_signalRService.onMethod(SignalRMethod.RoomClosed, (roomId) => this.onRoomClosed(roomId))
	}

	public async ngOnInit(): Promise<void> {
		this.route.paramMap.subscribe(async (params) => {
			this._roomId = +params.get('roomId');
			try {
				this.room = await this._roomsService.getRoom(this._roomId);
			} catch {
				this.toastr.error("Room not found!");
			}
		})
	}

	public async joinRoom(): Promise<void> {
		this.spinner.show();
		await this._signalRService.joinRoom(this._roomId, this.username, this.roomPassword);
	}

	public async updateUsername(): Promise<void> {
		await this._signalRService.updateUsername(this.username);
	}

	public async buzz(): Promise<void> {
		await this._signalRService.buzz(this._roomId);
	}

	public async clear(): Promise<void> {
		var jwtToken = this._storageService.getJwtToken(this._roomId);
		await this._signalRService.clear(this._roomId, jwtToken);
	}

	public async closeRoom(): Promise<void> {
		var jwtToken = this._storageService.getJwtToken(this._roomId);
		await this._signalRService.closeRoom(this._roomId, jwtToken);
	}

	public isRoomOwner(): boolean {
		return this._storageService.getJwtToken(this._roomId) != null;
	}

	private async onJoinSuccess(): Promise<void> {
		try {
			this.room = await this._roomsService.getRoom(this._roomId);
		} catch {
			this.toastr.error("Room not found!");
		}

		this.hasJoined = true;
		this.spinner.hide();
	}

	private onJoinFail(message: string): void {
		if (message == "ROOM_NOT_FOUND") {
			this.toastr.error("This room could not be found!");
		} else {
			this.toastr.error("Failed to join room!");
		}

		if (message == "INCORRECT_PASSWORD") {
			this.shouldDisplayIncorrectPasswordPrompt = true;
		}
		this.spinner.hide();
	}

	private onUserJoin(user: User): void {
		this.room?.usersInRoom.push(user);
	}

	private onUserLeave(userId: string): void {
		if (this.room) {
			let newUsersInRoom = this.room.usersInRoom.filter(user => user.id != userId);
			this.room.usersInRoom = newUsersInRoom;
		}
	}

	private onUserUpdatedName(userId: string, newUsername: string): void {
		this.room.usersInRoom.forEach(user => {
			if (user.id == userId) {
				user.name = newUsername;
			}
		});
	}

	private onBuzzerPressed(user: User, buzzResult: BuzzResult): void {
		this.room.usersInRoom.forEach(userInRoom => {
			if (userInRoom.id == user.id) {
				userInRoom.buzzResult = buzzResult;
			}
		});
	}

	private onBuzzPressResponse(buzzResult: BuzzResult): void {
		this.buzzResult = buzzResult;
	}

	private onScoresCleared(): void {
		this.buzzResult = undefined;

		this.room.usersInRoom.forEach(user => {
			user.buzzResult = null;
		});
	}

	private onRoomClosed(roomId: number): void {
		if (roomId == this._roomId) {
			this.shouldDisplayRoomClosedModal = true;
		}
	}

	private getBuzzerClass(): string {
		if (this.buzzResult == undefined) {
			return 'is-danger';
		}

		if (this.buzzResult.isFirstBuzz == true) {
			return 'is-success';
		}

		return 'is-warning';
	}
}
