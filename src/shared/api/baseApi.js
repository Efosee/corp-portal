import { Http } from "./http";

export class BaseApi extends Http {
	constructor(baseUrl, endpoint){
		super(baseUrl);
		this.endpoint = endpoint;
	}

	// async getList
}