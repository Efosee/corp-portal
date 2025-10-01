import { Box, Button } from "@mui/material"
import styles from '../styles/employeeDetails.module.scss';

export const ControlChangeBtn = ({onSave, onReset}) => {
	return (
		<Box sx={{ mt: 3, display: "flex", gap: 1 }}>
			<Button variant="contained" color="primary" onClick={onSave} className={styles.saveBtn}>
				Сохранить изменения
			</Button>
			<Button variant="contained" className={styles.cancelBtn} onClick={onReset}>
				Сброс
			</Button>
		</Box>
	)
}