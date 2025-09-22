

export class Ticket {
	constructor({id, personId, title, category, priority, status, createdAt, updatedAt, description}) {
		this.id = id;
		this.personId = personId;
		this.title = title;
		this.category = category;
		this.priority = priority;
		this.status = status;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.description = description;
	}
}
