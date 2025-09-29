import { BaseApi, API_CONFIG } from "../../../shared/api";
import { Education } from "../model/education";

class EducationApi extends BaseApi {
	constructor() {
		super(API_CONFIG.BASE_URL, API_CONFIG.ENDPOINTS.EDUCATIONS);
	}
	
	async getEducation(id, options){
		const educationData = await this.getById(id, options);
		return new Education(educationData);
	}

	async getEducationsByPersonId(personId, options) {
		const educationsData = await this.getByParams({ personId }, options);
		return educationsData.map(educationData => new Education(educationData));
	}

}

export const educationApi = new EducationApi();