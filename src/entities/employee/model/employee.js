
export class Employee {
	constructor({
		id, 
		lastName, 
		firstName, 
		middleName, 
		birthDate, 
		gender, 
		citizenship, 
		maritalStatus, 
		address, 
		phone, 
		email, 
		consent, 
		department
	}) {
		this.id = id;
		this.lastName = lastName;
		this.firstName = firstName;
		this.middleName = middleName;
		this.birthDate = birthDate;
		this.gender = gender;
		this.citizenship = citizenship;
		this.maritalStatus = maritalStatus;
		this.address = address;
		this.phone = phone;
		this.email = email;
		this.consent = consent;
		this.department = department;
	}

	get fullName() {
		return `${this.lastName} ${this.firstName} ${this.middleName}`;
	};


}