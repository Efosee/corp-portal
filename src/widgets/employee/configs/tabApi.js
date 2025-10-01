import {
	employeeApi,
	documentApi,
	familyMemberApi,
	educationApi,
	employmentApi,
	ticketsApi
} from "../../../entities"

export const TAB_API = {
	persons: employeeApi,
	documents: documentApi,
	familyMembers: familyMemberApi,
	educations: educationApi,
	employments: employmentApi,
	tickets: ticketsApi
}