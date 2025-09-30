import { BaseApi, API_CONFIG } from "../../../shared/api";
import { Document } from "../model/document";

class DocumentApi extends BaseApi {
	constructor() {
		super(API_CONFIG.BASE_URL, API_CONFIG.ENDPOINTS.DOCUMENTS);
	}
	
	async getDocuments(id, options){
		const documentData = await this.getById(id, options);
		return new Document(documentData);
	}

	async getDocumentsByPersonId(personId, options) {
		const documentsData = await this.getByParams({ personId }, options);
		return documentsData.map(documentData => new Document(documentData));
	}

}

export const documentApi = new DocumentApi();