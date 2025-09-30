import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import styles from '../style/filtering.module.scss';
import { useState } from 'react';

export const PageFilterButton = ({ children, onFilterChange, fieldFilters }) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div
			onClick={() => setIsActive(prev => !prev)}
			className={styles.pageFilter}
		>
				{children}
			{isActive ?
				<FiltersList
					onFilterChange={onFilterChange}
					filters={fieldFilters}
					setIsActive={setIsActive} /> :
				null}
		</div>
	)
}
/* filters:
	{
		key: "gender"
		values: [["Мужской", "male"], ["Женский", "female"]]
	}
*/
const FiltersList = ({ filters, onFilterChange }) => {

	return (
		<div className={styles.pageFilterContainer}>
			<List className={styles.listItem}>
				{filters.values.map(values => {
					return (
						<ListItem
							className={styles.listItem}>
							<ListItemButton
								onClick={() => onFilterChange(filters.key, values[1])}
								className={styles.listButton}

							>
								<ListItemText primary={values[0]} className={styles.listText} />
							</ListItemButton>
						</ListItem>
					)
				})}
			</List>
		</div>
	)
}