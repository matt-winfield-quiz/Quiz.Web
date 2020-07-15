import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
	providedIn: 'root'
})
export class SignalRService {
	private _hubConnection: HubConnection;

	constructor() {
		this._hubConnection = this.buildConnection();
		this.startConnection();
	}

	public async createRoom(name: string, password: string): Promise<void> {
		return await this._hubConnection.send("CreateRoom", name, password);
	}

	private buildConnection(): HubConnection {
		let hubUrl: string = "https://localhost:44313/QuizHub"

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

				// setTimeout(() => this.startConnection(), 3000);
			});
	}

	private registerSignalREvents() {
		// this._hubConnection.on("MessageReceived", (data: Room) => {
		// 	")
	}
}
