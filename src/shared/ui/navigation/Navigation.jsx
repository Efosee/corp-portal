import { NavItem } from "../nav-item/NavItem";
import { navigationItems } from '../../../widgets/sidebar/config/navigationItems';
import styles from './navigation.module.scss';

export const Navigation = ({ isCollapsed }) => {

	return (
		<nav>
			{
				navigationItems.map(({ id, iconComponent, ...item }) => (
					<NavItem
						className={styles.navigation}
						key={id}
						isCollapsed={isCollapsed}
						Icon={iconComponent}
						{...item}
					/>
				))
			}
		</nav>
	)
}