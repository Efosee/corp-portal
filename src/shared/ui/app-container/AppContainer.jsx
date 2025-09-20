import styles from './appContainer.module.scss';

export const AppContainer = ({children}) => {
	return(
		<div className={styles.container}>
			{children}
		</div>
	)
}