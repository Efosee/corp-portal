import styles from './modal.module.scss';

export const Modal = ({children}) => {
	return (
		<div className={styles.overlay}>
				{children}
		</div>
	)
}