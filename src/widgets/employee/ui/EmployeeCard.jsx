import styles from '../styles/employee.module.scss';
import { EmployeeAvatar } from '../../../entities/employee/ui/EmployeeAvatar';
import { TABS } from '../model/tabs';
export const EmployeeCard = ({ children, employee, onClick, tabActive }) => {

	return (
		<div className={styles.card}>
			<div className={styles.cardHeader}>
				<div className={styles.cardAvatar}>
					<EmployeeAvatar fullName={employee.fullName} />
				</div>
				<div className={styles.cardTitle}>
					Карточка сотрудника
				</div>
				<div className={styles.cardName}>
					{employee.fullName}
				</div>
			</div>

			<div className={styles.cardMenu}>
				<ul className={styles.cardMenuList}>
					{
						Object.entries(TABS).map(([key, label]) => (
							<li
								key={key}
								onClick={() => onClick(key)}
								className={tabActive === key ? styles.tabActive : ""}
							>
								{label}
							</li>
						))
					}
				</ul>
			</div>
			{children}
		</div>
	)
}