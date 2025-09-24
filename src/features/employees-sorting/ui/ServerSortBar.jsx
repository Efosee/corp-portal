import { Button} from "@mui/material";
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
		/> :
		<OpenBarButton onShow={setIsActive} Icon={SortIcon} isActive={hasActiveSort}/>

});

const View = ({ onClose, activeSort, onUpdateSort, onReset, isActive }) => {
	return (
		<Toolbar
			onClose={onClose}
			isActive={isActive}
			onReset={onReset}
			className={styles.sortingToolbar}
			caption={"Сортировка"}
		>
			<Button onClick={() => onUpdateSort(SORTING_FIELDS.FULL_NAME)}>
				ФИО
				{activeSort(SORTING_FIELDS.FULL_NAME)}
			</Button>
			<Button onClick={() => onUpdateSort(SORTING_FIELDS.BIRTH_DATE)}>
				Дата рождения
				{activeSort(SORTING_FIELDS.BIRTH_DATE)}
			</Button>
			<Button onClick={() => onUpdateSort(SORTING_FIELDS.TICKETS_COUNT)}>
				По количеству заявок
				{activeSort(SORTING_FIELDS.TICKETS_COUNT)}
			</Button>
		</Toolbar>
	);
}