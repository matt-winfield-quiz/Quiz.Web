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

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
	public hasJoined: boolean = false;
	public username: string;
	public room: Room;

	private _roomId: number;
	private _buzzResult: BuzzResult;

	constructor(private route: ActivatedRoute, private _signalRService: SignalRService,
		private _roomsService: RoomsService, private spinner: NgxSpinnerService, private toastr: ToastrService) {

		_signalRService.onMethod(SignalRMethod.UserJoinRoomSuccess, () => this.onJoinSuccess());
		_signalRService.onMethod(SignalRMethod.UserJoinRoomFail, () => this.onJoinFail());
		_signalRService.onMethod(SignalRMethod.UserJoinedRoom, (user) => this.onUserJoin(user));
		_signalRService.onMethod(SignalRMethod.UserLeftRoom, (userId) => this.onUserLeave(userId));
		_signalRService.onMethod(SignalRMethod.UserUpdatedName, (userId, newUsername) => this.onUserUpdatedName(userId, newUsername));
		_signalRService.onMethod(SignalRMethod.BuzzerPressed, (user, buzzResult) => this.onBuzzerPressed(user, buzzResult));
		_signalRService.onMethod(SignalRMethod.BuzzerPressSuccess, (buzzResult) => this.onBuzzPressResponse(buzzResult))
		_signalRService.onMethod(SignalRMethod.ScoresCleared, () => this.onScoresCleared());
	}

	public async ngOnInit(): Promise<void> {
		this.route.paramMap.subscribe(async params => {
			this._roomId = +params.get('roomId');
			this.room = await this._roomsService.getRoom(this._roomId);
		})
	}

	public async joinRoom(): Promise<void> {
		this.spinner.show();
		await this._signalRService.joinRoom(this._roomId, this.username);
	}

	public async updateUsername(): Promise<void> {
		await this._signalRService.updateUsername(this.username);
	}

	public async buzz(): Promise<void> {
		await this._signalRService.buzz(this._roomId);
	}

	public async clear(): Promise<void> {
		await this._signalRService.clear(this._roomId);
	}

	private onJoinSuccess(): void {
		this.spinner.hide();
		this.hasJoined = true;
	}

	private onJoinFail(): void {
		this.toastr.error("Failed to join room!");
		this.spinner.hide();
	}

	private onUserJoin(user: User): void {
		this.room.usersInRoom.push(user);
	}

	private onUserLeave(userId: string): void {
		let newUsersInRoom = this.room.usersInRoom.filter(user => user.id != userId);
		this.room.usersInRoom = newUsersInRoom;
	}

	private onUserUpdatedName(userId: string, newUsername: string) {
		this.room.usersInRoom.forEach(user => {
			if (user.id == userId) {
				user.name = newUsername;
			}
		});
	}

	private onBuzzerPressed(user: User, buzzResult: BuzzResult) {
		this.room.usersInRoom.forEach(userInRoom => {
			if (userInRoom.id == user.id) {
				userInRoom.buzzResult = buzzResult;
			}
		});
	}

	private onBuzzPressResponse(buzzResult: BuzzResult) {
		this._buzzResult = buzzResult;
	}

	private onScoresCleared() {
		this._buzzResult = undefined;

		this.room.usersInRoom.forEach(user => {
			user.buzzResult = null;
		});
	}

	private getBuzzerClass(): string {
		if (this._buzzResult == undefined) {
			return 'is-danger';
		}

		if (this._buzzResult.isFirstBuzz == true) {
			return 'is-success';
		}

		return 'is-warning';
	}
}
