import { useState, useCallback, useMemo, useEffect } from "react"
import { FETCH_API } from "./fetchApi";

// tab чтобы понять какое api использовать
// initState - после перехода с employeeTables будут основные данные пользователя
export const useFetchDetails = (personId, initTab, initState) => {
	const [data, setData] = useState();
	const [tab, setTab] = useState(initTab);
	const [employee, setEmployee] = useState(initState);
	const fetch = useMemo(() => FETCH_API[tab], [tab]);

	const fetchData = useCallback(async () => {
		const data = await fetch(personId);
		setData(data);
	}, [personId, tab]);

	const handleChangeData = useCallback((newData, index) => {
		if (index !== undefined) {
			console.log("SET NEW DATA", newData, data)
			setData(prev => {
				const items = [...prev];
				items[index] = { ...newData }
				console.log("update data", items)
				return items;
			})
		} else {
			setData(newData);
		}
	}, [data])

	useEffect(() => {
		fetchData();
	}, [tab, personId]);

	useEffect(() => {
		if (!initState) {
			FETCH_API.persons(personId)
				.then(employee => setEmployee(employee));
		}
	}, [personId])

	return {
		setTab,
		tab,
		data,
		employee,
		handleChangeData
	}
}