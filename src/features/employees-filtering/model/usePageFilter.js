import { useCallback, useMemo, useState } from "react"

export const usePageFilter = (employees) => {
	const [filters, setFilters] = useState({
		gender: null,
		department: null,
		hasTickets: null
	});

	const updateFilters = useCallback((key, value) => {
		setFilters(prev => ({
			...prev,
			[key]: value === '' ? null : value
		}));
	}, []);

	const resetFilters = useCallback(() => {
		setFilters({
			gender: null,
			department: null,
			hasTickets: null
		})
	}, [])

	const filteredEmployees = useMemo(() => {
		return employees.filter(emp => {
			return Object.entries(filters).every(
				([key, value]) => value === null || emp[key] === value)
		});
	}, [filters, employees]);

	const hasActiveFilters = Object.entries(filters)
		.some(([key, value]) => value !== null);


	return useMemo(() => ({
		filters,
		updateFilters,
		resetFilters,
		filteredEmployees,
		hasActiveFilters
	}), [filters, employees])
}