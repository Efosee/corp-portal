import { EmployeeTable } from "../widgets/employees-table";
import { Outlet } from "react-router"
export const Employees = () => {

	return (
		<>
			<EmployeeTable />
			<Outlet />
		</>
	)
}