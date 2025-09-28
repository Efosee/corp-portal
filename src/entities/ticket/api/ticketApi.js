import { BaseApi, API_CONFIG } from "../../../shared/api";

class TicketApi extends BaseApi {
	constructor() {
		super(API_CONFIG.BASE_URL, API_CONFIG.ENDPOINTS.TICKETS);
	}

	async getTicketsByPersonId(personId, options) {
		return await this.getByParams({ personId }, options);
	}

	async getTicketsCountByPersonId(personId, options) {
		try {
			const tickets = await this.getTicketsByPersonId(personId, options);
			return tickets.length;
		} catch (error) {
			console.error(`Failed to fetch tickets count for personId=${personId}:`, error);
			return 0;
		}
	}
}

export const ticketsApi = new TicketApi();