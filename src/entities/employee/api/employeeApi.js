import { BaseApi, API_CONFIG } from "../../../shared/api";
import { Employee } from "../model/employee";
import { EmployeeInTable } from "../model/employeeInTable";
import { ticketsApi } from "../../ticket/api/ticketApi";

class EmployeeApi extends BaseApi {
	constructor() {
		super(API_CONFIG.BASE_URL, API_CONFIG.ENDPOINTS.PERSONS);
	}

	async getEmployee(id, options) {
		const employeeData = await this.getById(id, options);
		return new Employee(employeeData);
	}

	async getEmployeesForTable(params = {}, options) {
		const { data, totalItems, currentItems } = await this.getList(params, options);

		const employeesWithTickets = await Promise.all(data.map(async (employeeData) => {
			const ticketsCount = await ticketsApi.getTicketsCountByPersonId(employeeData.id, options);
			return new EmployeeInTable(employeeData, ticketsCount);
		}));
		return {
			data: employeesWithTickets,
			totalItems,
			currentItems
		};
	}
};

export const employeeApi = new EmployeeApi();
