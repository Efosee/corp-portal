
class Http {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
		this.defaultHeaders = {
			'Content-Type': 'application/json',
		};
	}

	async request(endpoint, options = {}, withHeaders = false) {

		const url = `${this.baseUrl}${endpoint}`;

		const config = {
			...options,
			headers: { ...this.defaultHeaders, ...options.headers }
		};

		try {
			const response = await fetch(url, config);

			if (!response.ok) {
				throw new HttpError(
					`HTTP ${response.status}: ${response.statusText}`,
					response.status,
					url
				);
			}

			const data = await this.parseResponse(response);
			if (withHeaders) {
				return {
					data,
					headers: response.headers
				};
			}
			return data;

		} catch (error) {
			let httpError = error;

			if (!(error instanceof HttpError)) {
				httpError = new HttpError(error.message, 0, url);
			}

			httpError.consoleErr();
			throw httpError;
		}

	}

	async parseResponse(response) {
		const contentType = response.headers.get('content-type');

		if (contentType && contentType.includes('application/json')) {
			return await response.json();
		} else {
			return await response.text();
		}
	}

	async get(endpoint, params = {}, options, withHeaders) {
		const queryString = this.buildQueryString(params);
		const url = queryString ? `${endpoint}?${queryString}` : endpoint;

		return this.request(url, { ...options, method: 'GET' }, withHeaders);
	}

	async post(endpoint, body = {}, options, withHeaders) {
		return this.request(
			endpoint,
			{
				...options,
				method: 'POST',
				body: JSON.stringify(body)
			},
			withHeaders
		);
	}

	async put(endpoint, body = {}, options, withHeaders) {
		return this.request(
			endpoint,
			{
				...options,
				method: 'PUT',
				body: JSON.stringify(body)
			},
			withHeaders
		);
	}

	async patch(endpoint, body = {}, options, withHeaders) {
		return this.request(
			endpoint,
			{
				...options,
				method: 'PATCH',
				body: JSON.stringify(body)
			},
			withHeaders
		);
	}

	async delete(endpoint, options, withHeaders) {
		this.request(endpoint, { ...options, method: 'DELETE' }, withHeaders);
	}

	buildQueryString(params) {
		if (Object.keys(params).length > 0) {
			return new URLSearchParams(params).toString();
		}

		return null;
	}
}

class HttpError extends Error {
	constructor(message, status, url) {
		super(message);
		this.status = status;
		this.url = url;
	}

	consoleErr() {
		console.log(`${this.status}: ${this.message}! URL=${this.url}`);
	}
}

export { HttpError, Http };