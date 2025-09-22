import {TableRow, TableCell} from '../../../shared/ui/table';

export const EmployeeRow = ({employee, onClick}) => {
	const localFormatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('ru-Ru');
	}

	return (
		<TableRow onClick={() => onClick(employee.id)} style={{cursor: 'pointer'}}>
			<TableCell>{employee.fullName}</TableCell>
			<TableCell>{localFormatDate(employee.birthDate)}</TableCell>
			<TableCell>{employee.gender === "male" ? "М" : "Ж"}</TableCell>
			<TableCell>{employee.department}</TableCell>
			<TableCell>{employee.phone}</TableCell>
			<TableCell>{employee.ticketsCount}</TableCell>
		</TableRow>
	)
}