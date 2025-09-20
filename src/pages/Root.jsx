import { Outlet } from "react-router";
import { Sidebar } from "../widgets/sidebar";
import { AppContainer } from "../shared/ui";


export const Root = () => {
	return (
		<AppContainer>
			<Sidebar />
			<Outlet />
		</AppContainer>
	)
}