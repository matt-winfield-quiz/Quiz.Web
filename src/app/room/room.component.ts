import { Component } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss']
})
export class RoomComponent {

	public roomName: string;
	public roomPassword: string;

	constructor(private _signalRService: SignalRService) { }

	public async createRoom(): Promise<void> {
		return await this._signalRService.createRoom(this.roomName, this.roomPassword);
	}
}
