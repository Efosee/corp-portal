import { useFetchEmployees } from "../model/useFetchEmployees";
import { usePagination, PaginationControls } from "../../../features/employees-pagination";
import { useServerFilter, ServerFiltersBar, usePageFilter } from "../../../features/employees-filtering";
import { useServerSort, ServerSortBar, usePageSort } from "../../../features/employees-sorting";
import { Table } from "../../../shared/ui/table";
import { useProcessRender } from "../../../shared/hooks";
import styles from "../styles/EmployeeTable.module.scss";
import { EmployeeTableHeader } from "./EmployeeTableHeader";
import { EmployeeTableBody } from "./EmployeeTableBody";

import { Paper } from "@mui/material";

export const EmployeeTable = () => {
	console.log("render EmployeeTable");
	const { process, setProcess, renderContent } = useProcessRender();

	const pagination = usePagination(10);
	const serverFilters = useServerFilter(pagination.resetPagination);
	const serverSort = useServerSort();

	const { employees, totalItems, currentItems } = useFetchEmployees({
		pagination,
		filters: serverFilters,
		sort: serverSort,
		setProcess
	});

	const pageFilters = usePageFilter(employees);
	const pageFilredEmp = pageFilters.hasActiveFilters ? pageFilters.filteredEmployees : employees;

	const pageSort = usePageSort(pageFilredEmp);
	const processedEmp = pageSort.sortedEmployees;

	const View = () => (
		<div className={styles.employeeTable}>
			<div className={styles.header}>
				<h2 className={styles.title}>Сотрудники</h2>
			</div>
			<div className={styles.tableContainer}>
				<Table>
					<EmployeeTableHeader
						onFilterChange={pageFilters.updateFilters}
						filters={pageFilters.filters}
						sort={pageSort.sort}
						onUpdateSort={pageSort.updateSort}
					/>
					<EmployeeTableBody
						employees={processedEmp}
					/>
				</Table>
			</div>
			<PaginationControls
				currentItems={currentItems}
				currentPage={pagination.currentPage}
				totalItems={totalItems}
				itemPerPage={pagination.itemPerPage}
				onChangePage={pagination.changePage}
				onSetPage={pagination.setPage}
				onSetItemsPerPage={pagination.setItemPerPage}
			/>
		</div>);

	const Content = renderContent(process, View)

	return (
		<div className={styles.pageContainer}>
			<Paper className={styles.container}>
				<div className={styles.controlsSection}>
					<div className={styles.controlsRow}>
						<ServerFiltersBar
							filters={serverFilters.filters}
							onFilterChange={serverFilters.updateFilters}
							onReset={serverFilters.resetFilters}
							hasActiveFilters={serverFilters.hasActiveFilters}
						/>
					</div>
					<div className={styles.controlsRow}>
						<ServerSortBar
							sort={serverSort.sort}
							onUpdateSort={serverSort.updateSort}
							onResetSort={serverSort.resetSort}
							hasActiveSort={serverSort.hasActiveSort}
						/>
					</div>
				</div>
				<Content />
			</Paper>
		</div>
	)
}
