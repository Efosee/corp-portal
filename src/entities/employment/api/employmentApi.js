import { BaseApi, API_CONFIG } from "../../../shared/api";
import {Employment} from "../model/employment";

class EmploymentApi extends BaseApi {
	constructor() {
		super(API_CONFIG.BASE_URL, API_CONFIG.ENDPOINTS.EMPLOYMENTS);
	}
	
	async getEmployment(id, options){
		const employmentData = await this.getById(id, options);
		return new Employment(employmentData);
	}

	async getEmploymentsByPersonId(personId, options) {
		const employmentsData = await this.getByParams({ personId }, options);
		return employmentsData.map(employmentData => new Employment(employmentData));
	}

}

export const employmentApi = new EmploymentApi();