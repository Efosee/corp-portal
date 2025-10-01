import { Paper, Typography, Box } from '@mui/material';
import styles from './metricCard.module.scss';

export const MetricCard = ({ title, value, gradient, icon: Icon, isLoading }) => {
	return (
		<Paper 
			className={styles.card}
			sx={{
				background: gradient,
				boxShadow: `0 8px 24px ${gradient.replace('linear-gradient', 'rgba').replace(')', ', 0.3)')}`,
			}}
		>
			<Box className={styles.cardContent}>
				<Box className={styles.cardHeader}>
					{Icon && <Icon className={styles.cardIcon} />}
					<Typography className={styles.cardTitle} variant="h6">
						{title}
					</Typography>
				</Box>
				<Typography className={styles.cardValue} variant="h3">
					{isLoading ? '...' : value}
				</Typography>
			</Box>
		</Paper>
	);
};