import styles from './styles/table.module.scss';

export const TableCell = ({ children, isHeader=false }) => {
	const Cell = isHeader ? 'th' : 'td';
	return <Cell className={styles.cell}>{children}</Cell>;
}