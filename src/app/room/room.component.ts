import { Component } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss']
})
export class RoomComponent {

	constructor(private _signalRService: SignalRService) { }

	public async sendMessage(): Promise<void> {
		return await this._signalRService.createRoom("MyRoom", "1234");
	}
}
