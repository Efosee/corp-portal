export class Employment {
	constructor(
		id,
		personId,
		organization,
		position,
		hireDate,
		fireDate,
		current,
		employmentType,
		experience
	) {
		this.id = id;
		this.personId = personId;
		this.organization = organization;
		this.position = position;
		this.hireDate = hireDate;
		this.fireDate = fireDate;
		this.current = current;
		this.employmentType = employmentType;
		this.experience = experience;
	}
}