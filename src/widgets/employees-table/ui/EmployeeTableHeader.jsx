import { TableHead, TableCell, TableRow } from "../../../shared/ui/table";
import { FILTER_FIELDS, PageFilterButton } from '../../../features/employees-filtering';

import styles from "../styles/employeeTable.module.scss";

export const EmployeeTableHeader = ({ onFilterChange, filters }) => {
	return (
		<TableHead>
			<TableRow>
				<TableCell isHeader>
					ФИО
				</TableCell>
				<TableCell isHeader>
					Дата рождения
				</TableCell>
				<TableCell isHeader
					style={{ cursor: "pointer" }}
					className={filters.gender ? styles.pageFiltersActive : ""}
				>
					<PageFilterButton
						fieldFilters={FILTER_FIELDS.GENDER}
						onFilterChange={onFilterChange}>
						Пол
					</PageFilterButton>
				</TableCell>
				<TableCell isHeader
					style={{ cursor: "pointer" }}
					className={filters.department ? styles.pageFiltersActive : ""}
				>
					<PageFilterButton
						fieldFilters={FILTER_FIELDS.DEPARTMENT}
						onFilterChange={onFilterChange}>
						Подразделение
					</PageFilterButton>
				</TableCell>
				<TableCell isHeader>
					Телефон
				</TableCell>
				<TableCell isHeader
					style={{ cursor: "pointer" }}
					className={filters.hasTickets ? styles.pageFiltersActive : ""}
				>
					<PageFilterButton
						fieldFilters={FILTER_FIELDS.HAS_TICKETS}
						onFilterChange={onFilterChange}>
						Заявки
					</PageFilterButton>
				</TableCell>
			</TableRow>
		</TableHead>
	)
}