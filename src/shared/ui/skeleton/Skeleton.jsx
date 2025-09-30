import { Skeleton as MUISkeleton } from "@mui/material";
import styles from './skeleton.module.scss';

export const Skeleton = (props) => {

	return (
		<div className={styles.skeletonContainer}>
			{Array.from({length: 10}, (_, i) => <MUISkeleton variant="rectangular" key={i} {...props} />)}
		</div>
	)
}