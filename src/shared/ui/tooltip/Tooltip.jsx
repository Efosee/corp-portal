import { useState } from "react";
import styles from './tooltip.module.scss';

export const Tooltip = ({
	children, 
	content,
	position = "right",
	show=true,
	delay = 200
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [timeoutId, setTimeoutId] = useState(null);

	const showTooltip = () => {
		const id = setTimeout(() => {
			setIsVisible(true);
		}, delay);
		setTimeoutId(id);
	}

	const hideTooltip = () => {
		clearTimeout(timeoutId);
		setTimeoutId(null);
		setIsVisible(false);
	}

	return (
		<div 
		onMouseEnter={showTooltip}
		onMouseLeave={hideTooltip}
		className={styles.tooltipContainer}>
			{children}
			{show && isVisible && ViewTooltip(content, position)}
		</div>
	)
}

const ViewTooltip = (content, position) => {
	return (
		<div className={`${styles.tooltip} ${styles[position]}`}>
			<span className={styles.tooltipContent}>{content}</span>
		</div>
	)
}