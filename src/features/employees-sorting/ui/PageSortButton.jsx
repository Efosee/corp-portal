import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styles from '../style/sorting.module.scss';

export const PageSortButton = ({ children, direction, onUpdateSort, field }) => {
	const iconMap = {
		'asc': <ArrowUpwardIcon />,
		'desc': <ArrowDownwardIcon />
	}
	return (
		<div
			onClick={() => onUpdateSort(field)}
			className={styles.pageSort}
		>
			{children}
			{iconMap[direction]}
		</div>
	)
}
