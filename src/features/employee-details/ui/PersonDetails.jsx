import {
	Box,
	Grid,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Checkbox,
	FormControlLabel,
	Divider,
} from "@mui/material";

import { SELECT_FIELDS } from "../config/selectFields";
import { useFormUpdate } from "../model/useFormUpdate";
import styles from "../styles/employeeDetails.module.scss";
import { ControlChangeBtn } from "./ControlChangeBtn";

export const PersonDetails = ({ data, onSave }) => {
	const { form, changed, changeForm, resetForm } = useFormUpdate(data);

	if (!form) return null;


	return (
		<div className={styles.container}>
			{/* Блок 1: ФИО */}
			<h3 style={{ marginBottom: "16px" }}>ФИО</h3>
			<Grid container spacing={3}>
				<Grid size={{ xs: 12, md: 4 }}>
					<TextField
						label="Фамилия"
						fullWidth
						value={form.lastName || ""}
						onChange={(e) => changeForm("lastName", e.target.value)}
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 4 }}>
					<TextField
						label="Имя"
						fullWidth
						value={form.firstName || ""}
						onChange={(e) => changeForm("firstName", e.target.value)}
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 4 }}>
					<TextField
						label="Отчество"
						fullWidth
						value={form.middleName || ""}
						onChange={(e) => changeForm("middleName", e.target.value)}
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
					/>
				</Grid>
			</Grid>

			<Divider sx={{ my: 3 }} />

			{/* Блок 2: Личные данные */}
			<h3 style={{ marginBottom: "16px" }}>Личные данные</h3>
			<Grid container spacing={3}>
				<Grid size={{ xs: 12, md: 3 }}>
					<TextField
						type="date"
						label="Дата рождения"
						fullWidth
						value={form.birthDate || ""}
						onChange={(e) => changeForm("birthDate", e.target.value)}
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 3 }}>
					<FormControl fullWidth>
						<InputLabel>Пол</InputLabel>
						<Select
							value={form.gender || ""}
							label="Пол"
							onChange={(e) => changeForm("gender", e.target.value)}
							slotProps={{
								inputLabel: {
									shrink: true
								}
							}}
						>
							{SELECT_FIELDS.GENDER.map((gender) => (
								<MenuItem key={gender.value} value={gender.value}>
									{gender.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid size={{ xs: 12, md: 3 }}>
					<FormControl fullWidth>
						<InputLabel>Семейное положение</InputLabel>
						<Select
							value={form.maritalStatus || ""}
							label="Семейное положение"
							onChange={(e) => changeForm("maritalStatus", e.target.value)}
						>
							{SELECT_FIELDS.MARITAL_STATUS.map((m) => (
								<MenuItem key={m} value={m}>
									{m}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid size={{ xs: 12, md: 3 }}>
					<TextField
						label="Гражданство"
						fullWidth
						value={form.citizenship || ""}
						onChange={(e) => changeForm("citizenship", e.target.value)}
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
					/>
				</Grid>
			</Grid>

			<Divider sx={{ my: 3 }} />

			{/* Блок 3: Адресные данные */}
			<h3 style={{ marginBottom: "16px" }}>Адресные данные</h3>
			<Grid container spacing={3}>
				<Grid size={{ xs: 12, md: 4 }}>
					<FormControl fullWidth>
						<InputLabel>Подразделение</InputLabel>
						<Select
							value={form.department || ""}
							label="Подразделение"
							onChange={(e) => changeForm("department", e.target.value)}
						>
							{SELECT_FIELDS.DEPARTMENT.map((department) => (
								<MenuItem key={department} value={department}>
									{department}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid size={{ xs: 12, md: 4 }}>
					<TextField
						label="Email"
						type="email"
						fullWidth
						value={form.email || ""}
						onChange={(e) => changeForm("email", e.target.value)}
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 4 }}>
					<TextField
						label="Телефон"
						fullWidth
						value={form.phone || ""}
						onChange={(e) => changeForm("phone", e.target.value)}
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
					/>
				</Grid>
				<Grid size={{ xs: 12 }}>
					<TextField
						label="Адрес"
						fullWidth
						multiline
						value={form.address || ""}
						onChange={(e) => changeForm("address", e.target.value)}
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
					/>
				</Grid>
			</Grid>

			{/* Чекбокс */}
			<Box sx={{ mt: 3 }}>
				<FormControlLabel
					control={
						<Checkbox
							checked={!!form.consent}
							onChange={(e) => changeForm("consent", e.target.checked)}
						/>
					}
					label="Согласие на обработку данных"
				/>
			</Box>

			{
				changed &&
				<ControlChangeBtn onSave={() => onSave(form.id, form)} onReset={resetForm} />
			}
		</div>
	);
};
