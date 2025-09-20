import { IconButton } from "@mui/material";
import { SidebarIcons } from '../../../shared/ui';

const ToggleBarButton = ({ onToggle, iconProps, ...props }) => {

	return (
		<IconButton onClick={onToggle} {...props}>
			<SidebarIcons {...iconProps} />
		</IconButton>
	)
}

export { ToggleBarButton };
