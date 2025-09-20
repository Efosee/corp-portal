import { Dashboards, Employees, Root } from '../../../pages';

export const routes = [
	{
		path: "/",
		Component: Root,
		children: [
			{ index: true, Component: Dashboards },
			{path: "/employees", Component: Employees}
		]
	}
]