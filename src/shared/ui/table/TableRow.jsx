import styles from './styles/table.module.scss';

export const TableRow = ({ children }) => {
	return <tr className={styles.table}>{children}</tr>;
}