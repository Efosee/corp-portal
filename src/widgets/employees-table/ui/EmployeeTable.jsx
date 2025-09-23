import { useEffect, useState } from "react";
import { EmployeeRow } from "./EmployeeRow";
import { useFetchEmployees } from "../model/useFetchEmployees";
import { usePagination, PaginationControls } from "../../../features/employees-pagination";
import { Table, TableHead, TableCell, TableRow, TableBody } from "../../../shared/ui/table";
import { Paper } from "@mui/material";

export const EmployeeTable = () => {
	console.log("render EmployeeTable");
	const pagination = usePagination(10);
	const { employees, loading, error, totalItems, currentItems } = useFetchEmployees({pagination});

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
			<PaginationControls
				currentItems={currentItems}
				currentPage={pagination.currentPage}
				totalItems={totalItems}
				itemPerPage={pagination.itemPerPage}
				onChangePage={pagination.changePage}
				onSetPage={pagination.setPage}
				onSetItemsPerPage={pagination.setItemPerPage}
			/>
		</Paper>
	)
}