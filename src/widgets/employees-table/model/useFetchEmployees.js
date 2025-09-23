import { useState, useEffect, useCallback } from "react"
import { employeeApi } from "../../../entities/employee";



export const useFetchEmployees = ({ filters, sort, pagination, setProcess }) => {
	const [employees, setEmployees] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [currentItems, setCurrentItems] = useState([0, 0]);

	const fetchEmployees = useCallback(async () => {
		console.log("fetchEmployee")
		try {
			if (employees.length === 0) setProcess('loading'); 
			const params = {
				...pagination?.apiParams,
				...filters?.apiParams,
				...sort?.apiParams
			}
			const { data, totalItems, currentItems, } = await employeeApi.getEmployeesForTable(params);
			setProcess('success');
			setEmployees(data); 
			setCurrentItems(currentItems);
			setTotalItems(totalItems);

		} catch (err) {
			setProcess('error')
			console.error(err);
		}
	}, [pagination, sort, filters]);

	useEffect(() => {
		fetchEmployees();
	}, [fetchEmployees]);

	return {
		employees,
		totalItems,
		currentItems
	}
}