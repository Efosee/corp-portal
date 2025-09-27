import styles from './styles/table.module.scss';

export const TableCell = ({ children, isHeader = false, className, style }) => {
	const Cell = isHeader ? 'th' : 'td';
	return <Cell
		className={`${styles.cell} ${className}`}
		style={style}
	>
		{children}
	</Cell>;
}