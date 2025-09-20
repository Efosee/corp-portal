import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import GroupIcon from '@mui/icons-material/Group';

export const navigationItems = [
	{
		id: "index",
		label: "Главная",
		iconComponent: SpaceDashboardIcon,
		path: "/",
	},
	{
		id: "employees",
		label: "Cотрудники",
		iconComponent: GroupIcon,
		path: '/employees'
	}
]