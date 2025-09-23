import { Button, IconButton, Card, CardHeader, CardContent, } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styles from "../style/sorting.module.scss";
import { useState } from "react";

import { SORTING_FIELDS } from "../config/sortingFields";

export const ServerSortBar = ({ sort, onUpdateSort, onResetSort, hasActiveSort, }) => {
	const [isActive, setIsActive] = useState(false);

	const activeSort = (field) => {
		if (sort.field === field){
			return sort.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
		} else{
			return null;
		}
	}

	const ShowButton = (
		<IconButton onClick={() => setIsActive(true)}>
			<SortIcon />
		</IconButton>)

	const Sorting = (
		<Card>
				<IconButton onClick={() => {
					onResetSort();
					setIsActive(false);
				}}>
					<ClearIcon />
				</IconButton>
			<CardContent>
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
			</CardContent>
		</Card>
	)
	return isActive ? Sorting : ShowButton;
}