
export class Document {
	constructor(
		id,
		personId,
		docType,
		series,
		number,
		issueDate,
		issuedBy,
		valid
	){
		this.id = id;
		this.personId = personId;
		this.docType = docType;
		this.series = series;
		this.number = number;
		this.issueDate = issueDate;
		this.issuedBy = issuedBy;
		this.valid = valid;
	}
}