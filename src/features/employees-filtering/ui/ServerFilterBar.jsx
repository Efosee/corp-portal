import { Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import styles from '../style/filtering.module.scss';

export const ServerFiltersBar = ({ filters, onFilterChange, onReset, hasActiveFilters}) => {

  return (
    <div className={styles.filtersBar}>
      <FormControl size="small" className={styles.filter}>
        <InputLabel>Пол</InputLabel>
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
        <InputLabel>Подразделение</InputLabel>
        <Select
          value={filters.department || ''}
          onChange={(e) => onFilterChange('department', e.target.value)}
        >
          <MenuItem value="">Все подразделения</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" className={styles.filter}>
        <InputLabel>Заявки</InputLabel>
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

      {hasActiveFilters && (
        <Button onClick={onReset} variant="outlined" size="small">
          Сбросить
        </Button>
      )}
    </div>
  );
};