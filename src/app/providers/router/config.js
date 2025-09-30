import { Dashboards, Employees, Root, EmployeeProfile } from '../../../pages';

export const routes = [
	{
		path: "/",
		Component: Root,
		children: [
			{ index: true, Component: Dashboards },
			{path: "/employees", Component: Employees, children: [
				{path: "/employees/:id", Component: EmployeeProfile}
			]
			}
		]
	}
]