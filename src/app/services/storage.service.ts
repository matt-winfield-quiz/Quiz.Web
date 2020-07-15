import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	private jwtTokenKey: string = 'jwt';

	constructor() { }

	public storeJwtToken(token: string): void {
		sessionStorage.setItem(this.jwtTokenKey, token);
	}

	public getJwtToken(): string {
		return sessionStorage.getItem(this.jwtTokenKey);
	}
}
