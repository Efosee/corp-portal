import { useState, useCallback, useMemo, useEffect } from "react";

export const useFormUpdate = (data) => {
	const [form, setForm] = useState(data);
	const [changedIndexs, setChangedIndexs] = useState([]);

	//Если приходит новая дата, то синхронизируем с form
	useEffect(() => {
			setForm(prev => {
				//Если форма не массив и дата не массив -> объект, возвращаем просто объект
				//Если формы нет (undefined), то установить data (при initState)
					if (!prev || !(prev instanceof Array) || !(data instanceof Array)) {
							return data;
					}
					
					//Обновляем только те элементы, которые не изменены на форме
					//Иначе остальные измененные, но не сохраненные элементы сбросятся
					return data.map((item, index) => {
							//Если индекс в списке измененных, сохраняем текущее значение формы
							if (changedIndexs.includes(index)) {
									return prev[index] || item;
							}
							//Иначе обновляем из data
							return item;
					});
			});
			
			//Очищаем changedIndexs для элементов, которые теперь совпадают с data
			setChangedIndexs(prev => 
					prev.filter(index => 
							JSON.stringify(form[index]) !== JSON.stringify(data[index])
					)
			);
	}, [data]);

	const changed = useMemo(() => {
		return JSON.stringify(form) !== JSON.stringify(data);
	}, [form, data]);

	const deleteIndexs = () => {
		changedIndexs.forEach(i => {
			if (JSON.stringify(form[i]) === JSON.stringify(data[i])){
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