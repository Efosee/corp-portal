import { BaseApi, API_CONFIG } from "../../../shared/api";
import {FamilyMember} from "../model/familyMember";

class FamilyMemberApi extends BaseApi {
	constructor() {
		super(API_CONFIG.BASE_URL, API_CONFIG.ENDPOINTS.FAMILY_MEMBERS);
	}
	
	async getFamilyMember(id, options){
		const familyMemberData = await this.getById(id, options);
		return new FamilyMember(familyMemberData);
	}

	async getFamilyMembersByPersonId(personId, options) {
		const familyMembersData = await this.getByParams({ personId }, options);
		return familyMembersData.map(familyMemberData => new FamilyMember(familyMemberData));
	}

}

export const familyMemberApi = new FamilyMemberApi();