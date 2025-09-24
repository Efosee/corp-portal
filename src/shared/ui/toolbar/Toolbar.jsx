import styles from './toolbar.module.scss';
import { Paper, Box, IconButton, Button, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export const Toolbar = ({ children, onClose, isActive, onReset, caption, ...props }) => {

	return (
		<Paper className={styles.toolbar} {...props}>
			<Box className={styles.header}>
				<Typography className={styles.caption}>
					{caption}
				</Typography>
				<IconButton onClick={onClose}>
					<ClearIcon />
				</IconButton>
			</Box>

			<Box className={styles.content}>
				{children}
			</Box>
			{isActive && (
				<Button onClick={() => {
					onReset();
					onClose();
				}}
					variant="outlined" size="small">
					Сбросить
				</Button>
			)}
		</Paper>
	)
}