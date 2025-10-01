import { BaseApi, API_CONFIG } from "../../../shared/api";
import { Analytics } from "../model/analytics";

class AnalyticsApi extends BaseApi {
	constructor() {
		super(API_CONFIG.BASE_URL, '/analytics');
	}
	
	async getEmployeesByYear(options) {
		const analyticsData = await this.getByParams({}, options);
		return analyticsData.map(item => new Analytics(item));
	}
}

export const analyticsApi = new AnalyticsApi();