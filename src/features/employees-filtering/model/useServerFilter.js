import { useCallback, useMemo, useState } from "react"

export const useServerFilter = (resetPagination) => {
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
		resetPagination();
	}, []);

	const resetFilters = useCallback(() => {
		setFilters({
			gender: null,
			department: null,
			hasTickets: null
		})
	}, [])

	const hasActiveFilters = Object.values(filters).some(value => value !== null);

	const filtersForApi = (filters) => {
		const filtredEntries = Object.entries(filters).filter(([key, value]) => value !== null)
		return Object.fromEntries(filtredEntries);
	}

	return useMemo(() => ({
		filters,
		updateFilters,
		resetFilters,
		hasActiveFilters,
		apiParams: filtersForApi(filters)
	}), [filters, hasActiveFilters]);
}