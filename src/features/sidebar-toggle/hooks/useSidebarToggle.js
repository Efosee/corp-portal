import { useState } from "react"

const useSidebarToggle = () => {

	const [isCollapsed, setCollapse] = useState(false);

	const toggle = () => setCollapse(prev => !prev);
	const collapse  = () => setCollapse(true);
	const expand = () => setCollapse(false);

	return {
		isCollapsed,
		toggle,
		collapse,
		expand
	}
}

export {useSidebarToggle};