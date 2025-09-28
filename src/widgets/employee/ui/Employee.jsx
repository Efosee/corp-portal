import { Modal } from "../../../shared/ui";
import { EmployeeCard } from "./EmployeeCard";
import styles from "../styles/employee.module.scss";
import { useLocation } from "react-router";

export const Employee = () => {
	const location = useLocation();
	const employee = location.state.data;

	return (
		<Modal>
			<EmployeeCard
			employee={employee}
			tabActive={"persons"}
			>
				Тут будут загруженные данные
			</EmployeeCard>
		</Modal>
	)
}