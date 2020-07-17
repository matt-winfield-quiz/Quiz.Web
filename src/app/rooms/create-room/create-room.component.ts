import { Component } from '@angular/core';
import { SignalRService } from '../../services/SignalR/signal-r.service';
import { StorageService } from '../../services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { SignalRMethod } from '../../services/SignalR/SignalRMethod';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-create-room',
	templateUrl: './create-room.component.html',
	styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent {
	public roomName: string;
	public roomPassword: string;
	public success: string;

	constructor(private _signalRService: SignalRService, private _storageService: StorageService,
		private toastr: ToastrService, private router: Router, private spinner: NgxSpinnerService) {
		_signalRService.onMethod(SignalRMethod.RoomCreateSuccess, (token, roomId) => this.onRoomCreated(token, roomId));
	}

	public async createRoom(): Promise<void> {
		this.spinner.show();
		await this._signalRService.createRoom(this.roomName, this.roomPassword);
	}

	private onRoomCreated(token: string, roomId: number): void {
		this.spinner.hide();
		this._storageService.storeJwtToken(token);
		this.router.navigate(['/rooms', roomId.toString()])
		this.toastr.success("Room created succesfully!");
	}
}
