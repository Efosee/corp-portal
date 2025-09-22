import { Http } from "./http";

export class BaseApi extends Http {
	constructor(baseUrl, endpoint) {
		super(baseUrl);
		this.endpoint = endpoint;
	}

	async getList(params = {}, options) {
		const { data, headers } = await this.get(this.endpoint, params, options, true); //true для получения headers
		const totalItems = parseInt(headers.get('X-Total-Count')) || data.length; //если за раз возвращаются все данные, то заголовка не будет => берем длину массива
		const currentItems = [
			Math.min((params._page - 1) * params._limit + 1, totalItems), //если данных вообще нет, то totalItems=0
			Math.min(params._page * params._limit, totalItems)
		];
		return {
			data,
			totalItems,
			currentItems
		};
	}

	async getById(id, options) {
		return await this.get(`${this.endpoint}/${id}`, {}, options);
	}

	async create(data, options = {}) {
		return await this.post(this.endpoint, data, options);
	}

	async update(id, data, options){
		return await this.put(`${this.endpoint}/${id}`, data, options);
	}

	async patch(id, data, options){
		return await this.patch(`${this.endpoint}/${id}`, data, options);
	}

	async delete(id, options){
		return await this.delete(`${this.endpoint}/${id}`, options);
	}
}


