import { Employee } from "./employee";

export class EmployeeInTable extends Employee {
	constructor(employeeData, ticketsCount) {
		super(employeeData);
		this.ticketsCount = ticketsCount;
	}

	get hasTickets() {
		return this.ticketsCount > 0;
	}
}
