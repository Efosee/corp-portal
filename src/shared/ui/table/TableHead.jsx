import styles from './styles/table.module.scss';

export const TableHead = ({ children }) => {
	return <thead className={styles.head}>{children}</thead>;
}