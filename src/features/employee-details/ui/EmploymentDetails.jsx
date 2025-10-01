import {
	Box,
	Grid,
	TextField,
	Paper,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Checkbox,
	FormControlLabel
} from "@mui/material";

import { useFormUpdate } from "../model/useFormUpdate";
import styles from "../styles/employeeDetails.module.scss";
import { ControlChangeBtn } from "./ControlChangeBtn";
import { SELECT_FIELDS } from "../config/selectFields";

export const EmploymentDetails = ({ data, onSave }) => {
	const { form, changeForm, changed, changedIndexs, resetFormIndex } = useFormUpdate(data);

	if (!(form instanceof Array)) {
		return null;
	} else if (!form?.length) {
		return <Typography variant="h2" className={styles.notFound}>Места работы не добавлены</Typography>;
	}

	return (
		<div className={styles.container}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
				{form.map((emp, index) => (
					<Paper
						key={index}
						elevation={3}
						sx={{
							p: 3,
							backgroundColor: "#e8f5e9",
						}}
					>
						<Typography variant="h6" gutterBottom>
							Место работы {index + 1}
						</Typography>

						<Grid container spacing={3}>
							{/* Организация */}
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField
									label="Организация"
									fullWidth
									value={emp.organization || ""}
									onChange={(e) =>
										changeForm("organization", e.target.value, index)
									}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>

							{/* Должность */}
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField
									label="Должность"
									fullWidth
									value={emp.position || ""}
									onChange={(e) =>
										changeForm("position", e.target.value, index)
									}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>

							{/* Тип занятости */}
							<Grid size={{ xs: 12, md: 4 }}>
								<FormControl fullWidth>
									<InputLabel>Тип занятости</InputLabel>
									<Select
										value={emp.employmentType || ""}
										label="Тип занятости"
										onChange={(e) =>
											changeForm("employmentType", e.target.value, index)
										}
									>
										{SELECT_FIELDS.EMPLOYMENT_TYPES.map((type) => (
											<MenuItem key={type} value={type}>
												{type}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>

							{/* Дата приёма */}
							<Grid size={{ xs: 12, md: 4 }}>
								<TextField
									type="date"
									label="Дата приёма"
									fullWidth
									value={emp.hireDate || ""}
									onChange={(e) =>
										changeForm("hireDate", e.target.value, index)
									}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>

							{/* Дата увольнения */}
							<Grid size={{ xs: 12, md: 4 }}>
								<TextField
									type="date"
									label="Дата увольнения"
									fullWidth
									value={emp.fireDate || ""}
									onChange={(e) =>
										changeForm("fireDate", e.target.value, index)
									}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
									disabled={emp.current}
								/>
							</Grid>

							{/* Опыт работы (лет) */}
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField
									type="number"
									label="Опыт работы (лет)"
									fullWidth
									value={emp.experience || ""}
									onChange={(e) =>
										changeForm("experience", parseInt(e.target.value) || 0, index)
									}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>

							{/* Текущее место работы */}
							<Grid size={{ xs: 12, md: 6 }}>
								<FormControlLabel
									control={
										<Checkbox
											checked={!!emp.current}
											onChange={(e) =>
												changeForm("current", e.target.checked, index)
											}
										/>
									}
									label="Текущее место работы"
								/>
							</Grid>
						</Grid>
						{
							changed && changedIndexs.includes(index) &&
							<ControlChangeBtn onSave={() => onSave(index)} onReset={() => resetFormIndex(index)} />
						}
					</Paper>
				))}
			</Box>
		</div>
	);
};