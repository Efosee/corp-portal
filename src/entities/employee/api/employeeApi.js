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
		//TODO: реализовать фильтрацию по hasTickets
		const { hasTickets, ...apiParams } = params;
		const { data, totalItems, currentItems } = await this.getList(apiParams, options);

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

	async getMedianAgeEmployees(params, options) {
		const total = await this.getTotalCount();
		//Для total нечет, для чет создать в будущем...
		const median = Math.ceil(total / 2);
		params = { ...params, _page: median, _limit: 1, _sort: "birthDate" }
		const employee = await this.getByParams(params, options)
		const birthDate = new Date(employee[0].birthDate);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		//Eсли день рождения еще не наступил в этом году
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}

		return age;
	}

	async getDepartmentsTotalCount() {
		const hr = await this.getTotalCount({ department: "HR" });
		const support = await this.getTotalCount({ department: "Support" });
		const it = await this.getTotalCount({ department: "IT" });
		const finance = await this.getTotalCount({ department: "Finance" });
		const marketing = await this.getTotalCount({ department: "Marketing" });

		return {
			hr,
			support,
			it,
			marketing,
			finance
		}
	}
};

export const employeeApi = new EmployeeApi();
