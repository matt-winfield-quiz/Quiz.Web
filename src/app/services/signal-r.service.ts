import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ConfigService } from './config/config.service';
import { ApiEndpoints } from './config/ApiEndpoints';

@Injectable({
	providedIn: 'root'
})
export class SignalRService {
	private _hubConnection: HubConnection;

	constructor(private _configService: ConfigService) {
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
			.then(this.registerSignalREvents)
			.catch(error => {
				console.warn("Error while starting connection: " + error);

				setTimeout(() => this.startConnection(), 3000);
			});
	}

	private registerSignalREvents() {
		// this._hubConnection.on("MessageReceived", (data: Room) => {
		// 	")
	}
}
