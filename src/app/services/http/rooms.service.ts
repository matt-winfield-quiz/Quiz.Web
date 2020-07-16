import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../models/Room';
import { ConfigService } from '../config/config.service';

@Injectable({
	providedIn: 'root'
})
export class RoomsService {
	private _baseUrl: string;

	constructor(private _http: HttpClient, private _configService: ConfigService) {
		this._baseUrl = _configService.getHost();
	}

	public async getRooms(): Promise<Room[]> {
		let url: string = this._configService.getApiEndpoint("ROOMS");

		return await this._http.get<Room[]>(url).toPromise();
	}
}
