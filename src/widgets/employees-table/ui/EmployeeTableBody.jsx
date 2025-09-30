import {EmployeeRow} from "./EmployeeRow";
import {TableBody} from "../../../shared/ui/table";

export const EmployeeTableBody = ({employees}) => {
	return (
		<TableBody>
			{
				employees.map(employee => (
					<EmployeeRow
						key={employee.id}
						employee={employee}
					/>
				))
			}
		</TableBody>
	)
}