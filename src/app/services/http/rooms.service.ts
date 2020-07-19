import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../models/Room';
import { ConfigService } from '../config/config.service';
import { UrlBuilder } from '../../UrlBuilder';

@Injectable({
	providedIn: 'root'
})
export class RoomsService {
	constructor(private _http: HttpClient, private _configService: ConfigService) { }

	public async getRooms(): Promise<Room[]> {
		let url: string = this._configService.getApiEndpoint("ROOMS");

		return await this._http.get<Room[]>(url).toPromise();
	}

	public async getRoom(roomId: number): Promise<Room> {
		let baseUrl: string = this._configService.getApiEndpoint("ROOM");

		let url: string = new UrlBuilder(baseUrl).addQuery('roomId', roomId.toString()).build();

		return await this._http.get<Room>(url).toPromise();
	}

	public async getRoomScores(roomId: number): Promise<{ [userId: string]: number }> {
		let baseUrl: string = this._configService.getApiEndpoint("ROOM_SCORES");

		let url: string = new UrlBuilder(baseUrl).addQuery('roomId', roomId.toString()).build();

		return await this._http.get<{ [userId: string]: number }>(url).toPromise();
	}
}
