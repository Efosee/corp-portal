import { useState, useCallback, useMemo, useEffect } from "react";

export const useFormUpdate = (data) => {
	const [form, setForm] = useState(data);
	const [changedIndexs, setChangedIndexs] = useState([]);

	useEffect(() => {
		setForm(data);
	}, [data])

	const changed = useMemo(() => {
		return JSON.stringify(form) !== JSON.stringify(data);
	}, [form, data]);

			const deleteIndexs = () => {
			changedIndexs.forEach(i => {
				if (JSON.stringify(form[i]) === JSON.stringify(data[i])){
					console.log("delete index")
					setChangedIndexs(prev => {
						return prev.filter(index => index !== i)
					});
				};
			});
		};

	const changeForm = useCallback((key, value, index) => {
		setForm(prev => {
			//Если массив объектов
			if (prev instanceof Array) {
				const items = [...prev];
				items[index] = { ...items[index], [key]: value };
				return items;
			}
			//Если просто объект
			return { ...prev, [key]: value }
		});
		setChangedIndexs(prev => {
			const set = new Set([...prev, index]);
			return Array.from(set);
		});
	}, []);

		useEffect(() => {
			deleteIndexs()
		}, [changedIndexs]);

	const resetFormIndex = useCallback((i) => {
		if (i === undefined) return;
		setForm(prev => {
			const items = [...prev];
			items[i] = { ...data[i] };
			return items;
		});
		setChangedIndexs(prev => {
			return prev.filter(index => index !== i)
		});
	}, [data]);

	const resetForm = useCallback(() => {
		setForm(data)
	}, [data])


	return {
		form,
		changeForm,
		resetForm,
		changed,
		changedIndexs,
		resetFormIndex
	}
}

 // Реализация через сброс неактивного элемента формы
	// const changeForm = useCallback((key, value, index) => {
	// 	console.log( index, changedIndex)
	// 	if (index !== undefined && index === changedIndex) {
	// 		setForm(prev => {
	// 			//Если массив объектов
	// 			if (prev instanceof Array) {
	// 				const items = [...prev];
	// 				items[index] = { ...items[index], [key]: value };
	// 				return items;
	// 			}
	// 			//Если просто объект
	// 			return { ...prev, [key]: value }
	// 		});
	// 	} else {
	// 		if (index !== undefined) {
	// 			resetFormIndex(changedIndex);
	// 			setChangedIndex(index);
	// 		};
	// 		setForm(prev => {
	// 			//Если массив объектов
	// 			if (prev instanceof Array) {
	// 				const items = [...prev];
	// 				items[index] = { ...items[index], [key]: value };
	// 				return items;
	// 			}
	// 			//Если просто объект
	// 			return { ...prev, [key]: value }
	// 		});
			
	// 	}
	// }, [changedIndex]);