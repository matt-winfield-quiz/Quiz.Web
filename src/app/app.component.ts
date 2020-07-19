import { Component } from '@angular/core';
import { SignalRService } from './services/SignalR/signal-r.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRMethod } from './services/SignalR/SignalRMethod';
import { StorageService } from './services/storage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'QuizWeb';

	constructor(private _signalRService: SignalRService, private toastr: ToastrService, private spinner: NgxSpinnerService,
		private _storageService: StorageService) {

		this._signalRService.onConnectFail(() => this.toastr.error("Unable to connect to server!"));
		this._signalRService.onDisconnect(() => this.toastr.error("Lost connection to server!"));
		this._signalRService.onReconnecting(() => {
			this.spinner.show();
			this.toastr.warning("Connection to server lost, reconnecting...")
		});
		this._signalRService.onReconnected(() => {
			this.spinner.hide();
			this.toastr.success("Reconnected to server!");
		});

		this._signalRService.onMethod(SignalRMethod.InvalidJwtToken, (roomId) => this.onInvalidJwtToken(roomId));
	}

	private onInvalidJwtToken(roomId: number) {
		this.toastr.error("Permission denied");
		this._storageService.clearToken(roomId);
	}
}
