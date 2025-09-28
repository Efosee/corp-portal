import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import styles from '../style/filtering.module.scss';
import { Toolbar, OpenBarButton } from '../../../shared/ui';
import { 
	useState } from 'react';
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';



export const ServerFiltersBar = ({ filters, onFilterChange, onReset, hasActiveFilters }) => {
	const [isActive, setIsActive] = useState(false);

	return isActive ? <View
		onFilterChange={onFilterChange}
		filters={filters}
		onClose={() => setIsActive(false)}
		onReset={onReset}
		isActive={hasActiveFilters}
	/> :
		<OpenBarButton onShow={setIsActive} isActive={hasActiveFilters} Icon={FilterListAltIcon} />
};

const View = ({ onFilterChange, filters, onClose, isActive, onReset }) => {
	const customSX = {
		'&.Mui-focused': {
			transform: 'translate(14px, -20px) scale(0.8)', // Фиксируем позицию при фокусе
			color: 'primary.main'
		},
		'&.MuiInputLabel-shrink': {
			transform: 'translate(14px, -20px) scale(0.8)' // Фиксируем при наличии значения
		}
	}
	return (
		<Toolbar
			onClose={onClose}
			isActive={isActive}
			onReset={onReset}
			className={styles.filterToolbar}
			caption={"Фильтр"}
		>
			<div className={styles.filtersBar}>
				<FormControl size="small" className={styles.filter}>
					<InputLabel sx={customSX}>Пол</InputLabel>
					<Select
						value={filters.gender || ''}
						onChange={(e) => onFilterChange('gender', e.target.value)}
					>
						<MenuItem value="">Все</MenuItem>
						<MenuItem value="male">Мужской</MenuItem>
						<MenuItem value="female">Женский</MenuItem>
					</Select>
				</FormControl>

				<FormControl size="small" className={styles.filter}>
					<InputLabel sx={customSX}>Подразделение</InputLabel>
					<Select
						value={filters.department || ''}
						onChange={(e) => onFilterChange('department', e.target.value)}
					>
						<MenuItem value="">Все подразделения</MenuItem>
						<MenuItem value="IT">IT</MenuItem>
						<MenuItem value="HR">HR</MenuItem>
						<MenuItem value="Finance">Finance</MenuItem>
						<MenuItem value="Support">Support</MenuItem>
					</Select>
				</FormControl>

				<FormControl size="small" className={styles.filter}>
					<InputLabel sx={customSX}>
						Заявки
					</InputLabel>
					<Select
						value={filters.hasTickets?.toString() || ''}
						onChange={(e) => {
							const value = e.target.value === "" ? "" : e.target.value === 'true';
							onFilterChange('hasTickets', value);
						}}>
						<MenuItem value="">Все</MenuItem>
						<MenuItem value="true">Есть заявки</MenuItem>
						<MenuItem value="false">Нет заявок</MenuItem>
					</Select>
				</FormControl>
			</div>
		</Toolbar >
	)
}