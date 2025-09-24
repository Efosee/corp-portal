import { EmployeeRow } from "./EmployeeRow";
import { useFetchEmployees } from "../model/useFetchEmployees";
import { usePagination, PaginationControls } from "../../../features/employees-pagination";
import { useServerFilter, ServerFiltersBar } from "../../../features/employees-filtering";
import { useServerSort, ServerSortBar } from "../../../features/employees-sorting";
import { Table, TableHead, TableCell, TableRow, TableBody } from "../../../shared/ui/table";
import { Paper } from "@mui/material";
import { useProcessRender } from "../../../shared/hooks";

export const EmployeeTable = () => {
	console.log("render EmployeeTable");
	const pagination = usePagination(10);
	const serverFilters = useServerFilter(pagination.resetPagination);
	const serverSort = useServerSort();
	const { process, setProcess, renderContent } = useProcessRender();
	const { employees, totalItems, currentItems } = useFetchEmployees({
		pagination,
		filters: serverFilters,
		sort: serverSort,
		setProcess
	});
	const View = () => (
		<>
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
		</>)

	const Content = renderContent(process, View)

	return (
		<Paper>
			<ServerFiltersBar
				filters={serverFilters.filters}
				onFilterChange={serverFilters.updateFilters}
				onReset={serverFilters.resetFilters}
				hasActiveFilters={serverFilters.hasActiveFilters}
			/>
			<ServerSortBar
				sort={serverSort.sort}
				onUpdateSort={serverSort.updateSort}
				onResetSort={serverSort.resetSort}
				hasActiveSort={serverSort.hasActiveSort}
			/>
			<Content />
		</Paper>
	)
}
