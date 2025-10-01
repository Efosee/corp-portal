import { BaseApi, API_CONFIG } from "../../../shared/api";
import { Ticket } from "../model/ticket";

class TicketApi extends BaseApi {
	constructor() {
		super(API_CONFIG.BASE_URL, API_CONFIG.ENDPOINTS.TICKETS);
	}

	async getTicket(id, options) {
		const ticketData = await this.getById(id, options);
		return new Ticket(ticketData);
	}

	async getTicketsByPersonId(personId, options) {
		const ticketsData = await this.getByParams({ personId }, options)
		return ticketsData.map(ticketData => new Ticket(ticketData))
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

	async getTotalCountActive(params, options) {
		params = { ...params, status: "open" };
		const total = await this.getTotalCount(params, options);
		return total;
	}

	async getTotalCountByParam(params, options) {
		const total = await this.getTotalCount(params, options);
		return total;
	}

	async getStatusesTotalCount(){
	 const statuses = ["resolved", "open", "in_progress"];
    
    const data = await Promise.all(
        statuses.map(value => this.getTotalCountByParam({ status: value }))
    );
    
    const result = {};
    statuses.forEach((status, index) => {
        result[status] = data[index];
    });
		//Вернет: {resolved: x, open: x, in_progress: x}
    return result;
	}

}

export const ticketsApi = new TicketApi();