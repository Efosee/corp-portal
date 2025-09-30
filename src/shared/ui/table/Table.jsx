import styles from './styles/table.module.scss';

export const Table = ({ children }) => {
	return <table className={styles.table}>{children}</table>;
}