import styles from '../styles/employee.module.scss';
import { EmployeeAvatar } from '../../../entities/employee/ui/EmployeeAvatar';
import { TABS } from '../configs/tabs';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const EmployeeCard = ({ children, employee, onClickTab, tabActive, onClose }) => {

	return (
		<div className={styles.card}>
			<div className={styles.cardHeader}>
				<div className={styles.cardAvatar}>
					<EmployeeAvatar fullName={employee?.fullName} />
				</div>
				<div className={styles.cardTitle}>
					Карточка сотрудника
				</div>
				<div className={styles.cardName}>
					{employee?.fullName}
				</div>
				<IconButton
					onClick={onClose}
					className={styles.closeButton}
					aria-label="закрыть"
				>
					<CloseIcon />
				</IconButton>
			</div>

			<div className={styles.cardMenu}>
				<ul className={styles.cardMenuList}>
					{
						Object.entries(TABS).map(([tab, label]) => (
							<li
								key={tab}
								onClick={() => onClickTab(tab)}
								className={tabActive === tab ? styles.tabActive : ""}
							>
								{label}
							</li>
						))
					}
				</ul>
			</div>
			<div className={styles.cardContent}>
				{children}
			</div>
		</div>
	)
}