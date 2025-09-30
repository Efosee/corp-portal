import styles from './modal.module.scss';
import { useDebugValue, useEffect } from 'react';

export const Modal = ({children, onClose}) => {
	
	useEffect(() => {
		const handleClose = (e) => {
			if (e.key === "Escape" && onClose){
				onClose();
			}
		}

		document.addEventListener('keydown', handleClose);
		return () => document.removeEventListener('keydown', handleClose);
	}, [onClose])

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => document.body.style.overflow = 'visible';
	})

	const handleClose = (e) => {
		if (e.target === e.currentTarget && onClose){
			onClose()
		}
	}

	return (
		<div className={styles.overlay} onClick={handleClose}>
				{children}
		</div>
	)
}