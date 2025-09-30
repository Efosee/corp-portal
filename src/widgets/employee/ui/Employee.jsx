import { Modal } from "../../../shared/ui";
import { EmployeeCard } from "./EmployeeCard";
import { useFetchDetails } from "../../../features/employee-details";
import {TAB_COMPONENT} from "../configs/tabComponent";

import styles from "../styles/employee.module.scss";

import { useParams } from "react-router";
import { useMemo } from "react";

export const Employee = () => {
	const { id: employeeId } = useParams();
	const { setTab, tab, data, employee } = useFetchDetails(employeeId, "persons");
	console.log(data);

	//useMemo, чтобы не скакали данные, т.к. обновление стейта tab происходит перед data 
	const Component = useMemo(() => TAB_COMPONENT[tab], [data]);

	return (
		<Modal>
			<EmployeeCard
				employee={employee}
				tabActive={tab}
				onClickTab={setTab}
				contentData={data}
			>
				<Component data={data} />
			</EmployeeCard>
		</Modal>
	)
}