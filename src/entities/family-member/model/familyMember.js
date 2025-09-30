export class FamilyMember {
	constructor({
      id,
      personId,
      relativeId,
      relation,
      fullName, 
      birthDate,
      phone
	}) {
		 this.id = id;
      this.personId = personId;
      this.relativeId = relativeId;
      this.relation = relation;
      this.fullName = fullName;
      this.birthDate = birthDate;
      this.phone = phone;
	}
}