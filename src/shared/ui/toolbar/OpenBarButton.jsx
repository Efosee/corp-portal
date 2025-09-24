import styles from './toolbar.module.scss';
import { IconButton } from '@mui/material';

export const OpenBarButton = ({ onShow, Icon, isActive, ...props }) => {

	const color = isActive ? "primary" : "";

	return (
		<IconButton
			className={styles.openBarButton}
			onClick={() => onShow(true)}
			{...props}
		>
			<Icon color={color}/>
		</IconButton>
	);
}