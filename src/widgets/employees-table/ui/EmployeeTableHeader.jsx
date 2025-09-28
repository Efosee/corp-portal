import { TableHead, TableCell, TableRow } from "../../../shared/ui/table";
import { FILTER_FIELDS, PageFilterButton } from '../../../features/employees-filtering';
import { PageSortButton } from "../../../features/employees-sorting";

import styles from "../styles/employeeTable.module.scss";

export const EmployeeTableHeader = ({ onFilterChange, filters, sort, onUpdateSort }) => {
	return (
		<TableHead>
			<TableRow>
				<TableCell isHeader
					style={{ cursor: "pointer" }}
					className={sort.field === "fullName" ? styles.pageFiltersActive : ""}
				>
					<PageSortButton
						onUpdateSort={onUpdateSort}
						direction={sort.field === "fullName" ? sort.direction : null}
						field={"fullName"}
					>
						ФИО
					</PageSortButton>
				</TableCell>
				<TableCell isHeader
					style={{ cursor: "pointer" }}
					className={sort.field === "birthDate" ? styles.pageFiltersActive : ""}
				>
					<PageSortButton
						onUpdateSort={onUpdateSort}
						direction={sort.field === "birthDate" ? sort.direction : null}
						field={"birthDate"}
					>
						Дата рождения
					</PageSortButton>
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
					className={sort.field === "ticketsCount" ? styles.pageFiltersActive : ""}
				>
					{/* <PageFilterButton
						fieldFilters={FILTER_FIELDS.HAS_TICKETS}
						onFilterChange={onFilterChange}>
						Заявки
					</PageFilterButton> */}
					<PageSortButton
						onUpdateSort={onUpdateSort}
						direction={sort.field === "ticketsCount" ? sort.direction : null}
						field={"ticketsCount"}
					>
						Заявки
					</PageSortButton>
				</TableCell>
			</TableRow>
		</TableHead>
	)
}