export class FamilyMember {
	constructor({
		id,
		personId,
		level,
		institution,
		speciality,
		startDate,
		endDate,
		honours
	}) {
		this.id = id;
		this.personId = personId;
		this.level = level;
		this.institution = institution;
		this.speciality = speciality;
		this.startDate = startDate;
		this.endDate = endDate;
		this.honours = honours;
	}
}