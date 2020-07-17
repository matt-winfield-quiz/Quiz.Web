import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ConfigService } from '../config/config.service';
import { ApiEndpoints } from '../config/ApiEndpoints';
import { SignalRMethod } from './SignalRMethod';

@Injectable({
	providedIn: 'root'
})
export class SignalRService {
	private _hubConnection: HubConnection;
	private _hasStarted: boolean = false;
	private _hubStartPromise: Promise<boolean | void>;

	constructor(private _configService: ConfigService) {
		this._hubConnection = this.buildConnection();
		this.startConnection();
	}

	public async createRoom(name: string, password: string): Promise<void> {
		return await this._hubConnection.send(SignalRMethod.CreateRoom, name, password);
	}

	public async joinRoom(roomId: number, username: string): Promise<void> {
		return await this._hubConnection.send(SignalRMethod.JoinRoom, roomId, username);
	}

	public async updateUsername(username: string): Promise<void> {
		return await this._hubConnection.send(SignalRMethod.UpdateUsername, username);
	}

	public async buzz(roomId: number) {
		return await this._hubConnection.send(SignalRMethod.Buzz, roomId);
	}

	public onMethod(methodName: SignalRMethod, newMethod: (...args: any[]) => void): void {
		let errorHandledMethod = this.createErrorHandledSignalRMethod(newMethod);

		if (this._hasStarted) { // If already started just add the method
			this._hubConnection.on(methodName, errorHandledMethod)
		} else { // If not, add the subscription once finished loading
			this._hubStartPromise.then(() =>
				this._hubConnection.on(methodName, errorHandledMethod)
			);
		}
	}

	private buildConnection(): HubConnection {
		let hubUrl: string = this._configService.getApiEndpoint(ApiEndpoints.QUIZ_HUB);

		return new HubConnectionBuilder()
			.withUrl(hubUrl)
			.build();
	}

	private startConnection(): void {
		this._hubStartPromise = this._hubConnection
			.start()
			.then(() => this._hasStarted = true)
			.catch(error => {
				console.warn("Error while starting connection: " + error);

				setTimeout(() => this.startConnection(), 3000);
			});
	}

	private createErrorHandledSignalRMethod(newMethod: (...args: any[]) => void): (...args: any[]) => void {
		return (...args) => {
			try {
				newMethod(...args)
			} catch (e) {
				console.error('ERROR in SignalR method:', e);
			}
		}
	}
}
