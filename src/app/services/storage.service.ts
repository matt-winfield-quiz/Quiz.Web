import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	private jwtTokenKey: string = 'jwt';

	constructor() { }

	public storeJwtToken(roomId: number, token: string): void {
		sessionStorage.setItem(this.jwtTokenKey + roomId, token);
	}

	public getJwtToken(roomId: number): string {
		return sessionStorage.getItem(this.jwtTokenKey + roomId);
	}

	public clearToken(roomId: number): void {
		sessionStorage.removeItem(this.jwtTokenKey + roomId);
	}
}
