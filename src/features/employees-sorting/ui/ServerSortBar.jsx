import { Button } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styles from "../style/sorting.module.scss";
import { useState } from "react";
import { memo } from "react";
import { SORTING_FIELDS } from "../config/sortingFields";
import { Toolbar, OpenBarButton } from "../../../shared/ui";

export const ServerSortBar = memo(({ sort, onUpdateSort, onResetSort, hasActiveSort, }) => {
	const [isActive, setIsActive] = useState(false);

	const activeSort = (field) => {
		if (sort.field === field) {
			return sort.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
		} else {
			return null;
		}
	}

	return isActive ?
		<View
			onUpdateSort={onUpdateSort}
			activeSort={activeSort}
			onClose={() => setIsActive(false)}
			onReset={onResetSort}
			isActive={hasActiveSort}
			sort={sort}
		/> :
		<OpenBarButton onShow={setIsActive} Icon={SortIcon} isActive={hasActiveSort} />

});

const View = ({ onClose, activeSort, onUpdateSort, onReset, isActive, sort }) => {
	return (
		<Toolbar
			onClose={onClose}
			isActive={isActive}
			onReset={onReset}
			className={styles.sortingToolbar}
			caption={"Сортировка"}
		>
			<div className={styles.sortingButtons}>
				<Button
					onClick={() => onUpdateSort(SORTING_FIELDS.FULL_NAME)}
					className={sort.field === SORTING_FIELDS.FULL_NAME ? styles.active : ''}
				>
					ФИО
					{activeSort(SORTING_FIELDS.FULL_NAME)}
				</Button>
				<Button
					onClick={() => onUpdateSort(SORTING_FIELDS.BIRTH_DATE)}
					className={sort.field === SORTING_FIELDS.BIRTH_DATE ? `${styles.active}` : ""}
				>
					Дата рождения
					{activeSort(SORTING_FIELDS.BIRTH_DATE)}
				</Button>
				<Button
					onClick={() => onUpdateSort(SORTING_FIELDS.TICKETS_COUNT)}
					className={sort.field === SORTING_FIELDS.TICKETS_COUNT ? styles.active : ''}
				>
					По количеству заявок
					{activeSort(SORTING_FIELDS.TICKETS_COUNT)}
				</Button>
			</div>
		</Toolbar>
	);
}