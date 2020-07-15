import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ConfigService } from './config/config.service';
import { ApiEndpoints } from './config/ApiEndpoints';
import { StorageService } from './storage.service'
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class SignalRService {
	private _hubConnection: HubConnection;

	constructor(private _configService: ConfigService, private _storageService: StorageService, private toastr: ToastrService) {
		this._hubConnection = this.buildConnection();
		this.startConnection();
	}

	public async createRoom(name: string, password: string): Promise<void> {
		return await this._hubConnection.send("CreateRoom", name, password);
	}

	private buildConnection(): HubConnection {
		let hubUrl: string = this._configService.getApiEndpoint(ApiEndpoints.QUIZ_HUB);

		return new HubConnectionBuilder()
			.withUrl(hubUrl)
			.build();
	}

	private startConnection(): void {
		this._hubConnection
			.start()
			.then(() => this.registerSignalREvents())
			.catch(error => {
				console.warn("Error while starting connection: " + error);

				setTimeout(() => this.startConnection(), 3000);
			});
	}

	private registerSignalREvents(): void {
		this._hubConnection.on("RoomCreated", this.onRoomCreated);
	}

	private onRoomCreated(token: string) {
		this._storageService.storeJwtToken(token);
		this.toastr.success('Room created successfully!;')
	}
}
