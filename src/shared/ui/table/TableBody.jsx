import styles from './styles/table.module.scss';

export const TableBody = ({ children }) => {
	return <tbody className={styles.body}>{children}</tbody>;
}