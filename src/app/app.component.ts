import { Component } from '@angular/core';
import { SignalRService } from './services/SignalR/signal-r.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'QuizWeb';

	constructor(private _signalRService: SignalRService, private toastr: ToastrService, private spinner: NgxSpinnerService) {
		this._signalRService.onDisconnect(() => this.toastr.error("Lost connection to server!"));
		this._signalRService.onReconnecting(() => {
			this.spinner.show();
			this.toastr.warning("Connection to server lost, reconnecting...")
		});
		this._signalRService.onReconnected(() => {
			this.spinner.hide();
			this.toastr.success("Reconnected to server!");
		});
	}
}
