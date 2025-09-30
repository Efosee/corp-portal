import {
	documentApi, employeeApi, employmentApi, educationApi, ticketsApi, familyMemberApi
} from "../../../entities";

export const FETCH_API = {
	persons: employeeApi.getEmployee.bind(employeeApi),
	documents: documentApi.getDocumentsByPersonId.bind(documentApi),
	familyMembers: familyMemberApi.getFamilyMembersByPersonId.bind(familyMemberApi),
	educations: educationApi.getEducationsByPersonId.bind(educationApi),
	employments: employmentApi.getEmploymentsByPersonId.bind(employmentApi),
	tickets: ticketsApi.getTicketsByPersonId.bind(ticketsApi)
}