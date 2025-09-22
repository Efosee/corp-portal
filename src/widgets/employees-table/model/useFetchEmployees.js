import { useState, useEffect, useCallback } from "react"
import { employeeApi } from "../../../entities/employee";

export const useFetchEmployees = ({ filters, sort, pagination }) => {
	const [employees, setEmployees] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [currentItems, setCurrentItems] = useState([0, 0]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchEmployees = useCallback(async () => {
		try {
			const params = {
				...pagination?.apiParams,
				...filters?.apiParams,
				...sort?.apiParams
			}
			const {data, totalItems,currentItems, } = await employeeApi.getEmployeesForTable(params);
			setEmployees(data);
			setCurrentItems(currentItems);
			setTotalItems(totalItems);
	
		} catch (err) {
			setError(err);
			console.error(err);
		} finally {
			setLoading(false);
		}
	}, [pagination, sort, filters]);

	useEffect(() => {
		fetchEmployees();
	}, [fetchEmployees]);

	return {
		employees,
		totalItems,
		currentItems,
		loading,
		error
	}
}