export class UrlBuilder {
	private _baseUrl: string;
	private _isFirstQuery: boolean = true;

	constructor(baseUrl: string) {
		this._baseUrl = baseUrl;
	}

	public addQuery(key: string, value: string): UrlBuilder {
		if (this._isFirstQuery) {
			this._baseUrl += '?' + key + '=' + value;
			this._isFirstQuery = false;
		} else {
			this._baseUrl += '&' + key + '=' + value;
		}
		return this;
	}

	public build(): string {
		return this._baseUrl;
	}
}