import { TableRow, TableCell } from '../../../shared/ui/table';
import styles from '../styles/employeeTable.module.scss';



export const EmployeeRow = ({ employee, onClick }) => {
	const localFormatDate = (dateString) => {
		const localDate = new Date(dateString).toLocaleDateString('ru-Ru')
		return localDate.replaceAll(".", "-");
	}

	return (
		<TableRow onClick={() => onClick(employee.id)} style={{ cursor: 'pointer' }}>
			<TableCell>
				<span className={styles.cellFullName}>{employee.fullName}</span>
			</TableCell>
			<TableCell>{localFormatDate(employee.birthDate)}</TableCell>
			<TableCell>
				<span className={`${styles.cellGender} ${styles[`cellGender--${employee.gender}`]}`}>
					{employee.gender === "male" ? "М" : "Ж"}
				</span>
			</TableCell>
			<TableCell>{employee.department}</TableCell>
			<TableCell>{employee.phone}</TableCell>
			<TableCell>
				<span className={`${styles.cellTicketsCount} ${employee.hasTickets ? styles['cellTicketsCount--hasTickets'] : styles['cellTicketsCount--noTickets']}`}>
					{employee.ticketsCount}
				</span>
			</TableCell>
		</TableRow>
	)
}