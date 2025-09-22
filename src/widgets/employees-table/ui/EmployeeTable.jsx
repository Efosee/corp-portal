import { EmployeeRow } from "./EmployeeRow";
import { useFetchEmployees } from "../model/useFetchEmployees";
import {Table, TableHead, TableCell, TableRow, TableBody} from "../../../shared/ui/table";
import { Paper } from "@mui/material";

export const EmployeeTable = () => {
	const { employees, loading, error, totalItems, currentItems } = useFetchEmployees({});

	return (
		<Paper>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell isHeader>
							ФИО
						</TableCell>
						<TableCell isHeader>
							Дата рождения
						</TableCell>
						<TableCell isHeader>
							Пол
						</TableCell>
						<TableCell isHeader>
							Подразделение
						</TableCell>
						<TableCell isHeader>
							Телефон
						</TableCell>
						<TableCell isHeader>
							Заявки
						</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{employees.map(employee => (
						<EmployeeRow 
							key={employee.id}
							employee={employee}
						/>
					))}
				</TableBody>
			</Table>
		</Paper>
	)
}