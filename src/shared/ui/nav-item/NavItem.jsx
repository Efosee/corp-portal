import { NavLink } from "react-router"
import styles from './navItem.module.scss';
import { CollapseedItem } from "../collapsed-item/CollapsedItem";
import { Tooltip } from "../tooltip/Tooltip";

export const NavItem = ({ Icon, path, label, isCollapsed }) => {

	return (
		<Tooltip content={label} show={isCollapsed}>
			<NavLink
				to={path}
				className={({ isActive }) =>
					isActive ? `${styles.link} ${styles.linkActive}` : styles.link
				}
			>
				<Icon className={styles.linkIcon} />
				<CollapseedItem isCollapsed={isCollapsed} duration={400}>
					<span className={styles.linkCaption}>{label}</span>
				</CollapseedItem>
			</NavLink>
		</Tooltip>
	)
}