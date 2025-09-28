import { useState, useCallback, useMemo } from 'react';

export const usePageSort = (employees) => {
	const [sort, setSort] = useState({
		field: null,
		direction: null //asc и desc
	});

	const updateSort = useCallback((field) => {
		setSort(prev => {
			if (prev.field === field) {
				switch (prev.direction) {
					case 'asc':
						return { field, direction: 'desc' };
					case 'desc':
						return { field: null, direction: null };
					default:
						return { field, direction: 'asc' }
				}
			} else {
				return { field, direction: 'asc' }
			}
		});
	}, []);

	const resetSort = useCallback(() => {
		setSort({ field: null, direction: null });
	}, []);

	const sortedEmployees = useMemo(() => {
		if (!sort.field) return employees;
		const sorted = [...employees].sort((a, b) => {
			if (a[sort.field] < b[sort.field]) return sort.direction === 'asc' ? -1 : 1;
			if (a[sort.field] > b[sort.field]) return sort.direction === 'asc' ? 1 : -1;
			return 0;
		});
		return sorted;
	}, [employees, sort]);

	return useMemo(() => ({
		sort,
		updateSort,
		sortedEmployees,
		resetSort
	}), [sort, employees]);
}