import { Component } from '@angular/core';
import { SignalRService } from '../services/SignalR/signal-r.service';
import { StorageService } from '../services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { SignalRMethod } from '../services/SignalR/SignalRMethod';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss']
})
export class RoomComponent {
	public roomName: string;
	public roomPassword: string;
	public success: string;

	constructor(private _signalRService: SignalRService, private _storageService: StorageService, private toastr: ToastrService) {
		_signalRService.onMethod(SignalRMethod.RoomCreated, (token) => this.onRoomCreated(token));
	}

	public async createRoom(): Promise<void> {
		return await this._signalRService.createRoom(this.roomName, this.roomPassword);
	}

	private onRoomCreated(token: string): void {
		this._storageService.storeJwtToken(token);
		this.toastr.success("Room created succesfully!");
	}
}
