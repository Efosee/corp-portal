import { useCallback, useMemo, useState } from "react";

export const useServerSort = () => {
	const [sort, setSort] = useState({
		field: null,
		direction: null //asc и desc
	});

	const updateSort = useCallback((field) => {
		setSort(prev => {
			if (prev.field === field){
				switch(prev.direction){
					case 'asc':
						return {field, direction: 'desc'};
					case 'desc':
						return {field: null, direction: null};
					default:
						return {field, direction: 'asc'}
				}
			} else {
				return {field, direction: 'asc'}
			}
		});
	}, [])

	const resetSort = useCallback(() => {
		setSort({field: null, direction: null});
	}, [])

	const hasActiveSort = sort.direction !== null;
	const apiParams = sort.field ? {
		_sort: sort.field,
		_order: sort.direction
	} : {};

	return useMemo(() => ({
		sort,
		updateSort,
		resetSort,
		hasActiveSort,
		apiParams
	}), [sort]);
}