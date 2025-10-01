import { Http } from "./http";

export class BaseApi extends Http {
	constructor(baseUrl, endpoint) {
		super(baseUrl);
		this.endpoint = endpoint;
	}

	async getTotalCount(params = {}, options) {
		params = { ...params, _page: 1, _limit: 1 }
		const { headers, data } = await this.get(this.endpoint, params, options, true);
		const totalItems = parseInt(headers.get('X-Total-Count')) || data.length;
		return totalItems;
	}

	/**
	 * Получает общее количество элементов, соответствующих заданным диапазонам
	 * 
	 * @async
	 * @param {Object} params - Объект с диапазонами для фильтрации
	 * @param {Object} params.key - Ключ параметра для фильтрации
	 * @param {*} params.key.gte - Значение "больше или равно" 
	 * @param {*} params.key.lte - Значение "меньше или равно"
	 * @param {Object} [option] - Дополнительные хэдеры
	 * @returns {Promise<number>} Общее количество элементов, удовлетворяющих критериям фильтрации
	 * 
	 * @description
	 * Функция преобразует параметры диапазонов в формат, понятный json db,
	 * выполняет запрос с пагинацией (только первая страница с одним элементом) для получения
	 * заголовка X-Total-Count, который содержит общее количество элементов.
	 * Если данных нет или всего 1 элемент, возвращает количество элементов в ответе.
	 * 
	 * @example
	 * // Пример: api.getTotalCountByRange({
	 *   birthDate: { gte: "1960-01-01", lte: "1970-01-01" },
	 *   id: { gte: 1, lte: 50 }
	 * });
	 */
	async getTotalCountByRange(params = {}, options) {
		const newParams = {};
		for (const [key, { gte, lte }] of Object.entries(params)) {
			newParams[`${key}_gte`] = gte;
			newParams[`${key}_lte`] = lte;
		}

		params = { ...newParams, _page: 1, _limit: 1 }
		const { headers, data } = await this.get(this.endpoint, params, options, true);
		const totalItems = parseInt(headers.get('X-Total-Count')) || data.length;
		return totalItems;
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

	async getByParams(params = {}, options) {
		return await this.get(this.endpoint, params, options);
	}

	async getById(id, options) {
		return await this.get(`${this.endpoint}/${id}`, {}, options);
	}

	async create(data, options = {}) {
		return await this.post(this.endpoint, data, options);
	}

	async update(id, data, options) {
		return await this.put(`${this.endpoint}/${id}`, data, options);
	}

	async patch(id, data, options) {
		return await this.patch(`${this.endpoint}/${id}`, data, options);
	}

	async delete(id, options) {
		return await this.delete(`${this.endpoint}/${id}`, options);
	}
}


