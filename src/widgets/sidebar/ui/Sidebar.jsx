import { useSidebarToggle, ToggleBarButton } from "../../../features/sidebar-toggle";
import { Navigation } from "../../../shared/ui";
import { Paper } from "@mui/material";
import styles from '../styles/sidebar.module.scss';
import { Tooltip } from "../../../shared/ui";

export const Sidebar = () => {

	const { isCollapsed, toggle } = useSidebarToggle();
	const iconProps = {
		style: {
			height: "25px",
			width: "25px"
		}
	}

	return (
		<Paper
			component='aside'
			elevation={3}
			className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : styles.expanded}`}
		>
			<Tooltip content={isCollapsed ? "Открыть меню" : "Закрыть меню"}>
				<ToggleBarButton onToggle={toggle} iconProps={iconProps} className={styles.toggleButton} />
			</Tooltip>
			<Navigation isCollapsed={isCollapsed} />
		</Paper>
	)
}