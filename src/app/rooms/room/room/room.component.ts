import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignalRService } from 'src/app/services/SignalR/signal-r.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { SignalRMethod } from 'src/app/services/SignalR/SignalRMethod';
import { RoomsService } from 'src/app/services/http/rooms.service';
import { Room } from 'src/app/models/Room';
import { User } from 'src/app/models/User';

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
	private _isLoading: boolean = true;

	constructor(private route: ActivatedRoute, private _signalRService: SignalRService,
		private _roomsService: RoomsService, private spinner: NgxSpinnerService, private toastr: ToastrService) {

		_signalRService.onMethod(SignalRMethod.UserJoinRoomSuccess, () => this.onJoinSuccess());
		_signalRService.onMethod(SignalRMethod.UserJoinRoomFail, () => this.onJoinFail());
		_signalRService.onMethod(SignalRMethod.UserJoinedRoom, (user) => this.onUserJoin(user));
		_signalRService.onMethod(SignalRMethod.UserLeftRoom, (userId) => this.onUserLeave(userId));
	}

	public async ngOnInit(): Promise<void> {
		this.route.paramMap.subscribe(async params => {
			this._roomId = +params.get('roomId');
			this.room = await this._roomsService.getRoom(this._roomId);
		})
	}

	public async joinRoom(): Promise<void> {
		this._isLoading = true;
		this.spinner.show();
		await this._signalRService.joinRoom(this._roomId, this.username);
	}

	public async updateUsername(): Promise<void> {

	}

	private onJoinSuccess(): void {
		this._isLoading = false;
		this.spinner.hide();
		this.hasJoined = true;
	}

	private onJoinFail(): void {
		this.toastr.error("Failed to join room!");
		this._isLoading = false;
		this.spinner.hide();
	}

	private onUserJoin(user: User): void {
		this.room.usersInRoom.push(user);
	}

	private onUserLeave(userId: string): void {
		let newUsersInRoom = this.room.usersInRoom.filter(user => user.id != userId);
		this.room.usersInRoom = newUsersInRoom;
	}
}
