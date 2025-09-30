export const SELECT_FIELDS = {
	GENDER: [
		{ value: "male", label: "Мужской" },
		{ value: "female", label: "Женский" },
	],
	DEPARTMENT: ["HR", "IT", "Support", "Finance", "Marketing"],
	MARITAL_STATUS: [
		"холост/незамужем",
		"женат",
		"замужем",
		"разведён",
		"разведена",
		"вдовец",
		"вдова"
	],

	DOC_TYPES: ["паспорт", "загранпаспорт", "водительское"],

	EDUCATION_LEVELS: ["среднее", "СПО", "высшее", "магистратура"],

	EMPLOYMENT_TYPES: ["полная", "частичная", "фриланс"],

	RELATION_TYPES: ["сестра", "брат", "отец", "супруг", "дочь", "сын", "мать"],

	TICKET_CATEGORY: {
		hardware: "Оборудование",
		software: "ПО",
		payments: "Оплата",
		access: "Доступ"
	},
	TICKET_STATUS: {
		open: "Открыт",
		in_progress: "В работе",
		closed: "Закрыт",
		resolved: "Решен"
	},
	TICKET_PRIORITIES: ["низкий", "средний", "высокий", "срочный"]
}