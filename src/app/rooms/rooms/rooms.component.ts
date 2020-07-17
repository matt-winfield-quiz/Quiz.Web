import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/http/rooms.service';
import { Room } from 'src/app/models/Room';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from 'src/app/services/SignalR/signal-r.service';
import { SignalRMethod } from 'src/app/services/SignalR/SignalRMethod';

@Component({
	selector: 'app-rooms',
	templateUrl: './rooms.component.html',
	styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
	public rooms: Room[];

	constructor(private _roomsService: RoomsService, private spinner: NgxSpinnerService,
		private _signalRService: SignalRService) {

		this._signalRService.onMethod(SignalRMethod.RoomCreated, (newRoom) => this.onRoomCreated(newRoom));
		this._signalRService.onMethod(SignalRMethod.RoomClosed, (roomId) => this.onRoomClosed(roomId));
	}

	public async ngOnInit(): Promise<void> {
		this.spinner.show();
		this.rooms = await this._roomsService.getRooms();
		this.spinner.hide();
	}

	private onRoomCreated(room: Room): void {
		this.rooms.push(room);
	}

	private onRoomClosed(roomId: number): void {
		let newRooms = this.rooms.filter(room => room.id != roomId);
		this.rooms = newRooms;
	}
}
