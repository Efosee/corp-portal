import styles from './styles/table.module.scss';

export const TableRow = ({ children, ...props}) => {
	return <tr className={styles.row} {...props}>{children}</tr>;
}