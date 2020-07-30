import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	private jwtTokenKey: string = 'jwt';

	constructor() { }

	public storeJwtToken(roomId: number, token: string): void {
		localStorage.setItem(this.jwtTokenKey + roomId, token);
	}

	public getJwtToken(roomId: number): string {
		return localStorage.getItem(this.jwtTokenKey + roomId);
	}

	public clearToken(roomId: number): void {
		localStorage.removeItem(this.jwtTokenKey + roomId);
	}
}
