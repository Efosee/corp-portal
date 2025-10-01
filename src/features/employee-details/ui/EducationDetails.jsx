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

export const EducationDetails = ({ data, onSave }) => {
	const { form, changeForm, changed, changedIndexs, resetFormIndex } = useFormUpdate(data);

	if (!(form instanceof Array)) {
		return null;
	} else if (!form?.length) {
		return <Typography variant="h2" className={styles.notFound}>Образование не добавлено</Typography>;
	}

	return (
		<div className={styles.container}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
				{form.map((edu, index) => (
					<Paper
						key={index}
						elevation={3}
						sx={{
							p: 3,
							backgroundColor: "#fff3e0",
						}}
					>
						<Typography variant="h6" gutterBottom>
							Образование {index + 1}
						</Typography>

						<Grid container spacing={3}>
							{/* Уровень образования */}
							<Grid size={{ xs: 12, md: 4 }}>
								<FormControl fullWidth>
									<InputLabel>Уровень образования</InputLabel>
									<Select
										value={edu.level || ""}
										label="Уровень образования"
										onChange={(e) =>
											changeForm("level", e.target.value, index)
										}
									>
										{SELECT_FIELDS.EDUCATION_LEVELS.map((level) => (
											<MenuItem key={level} value={level}>
												{level}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>

							{/* Учебное заведение */}
							<Grid size={{ xs: 12, md: 8 }}>
								<TextField
									label="Учебное заведение"
									fullWidth
									value={edu.institution || ""}
									onChange={(e) =>
										changeForm("institution", e.target.value, index)
									}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>

							{/* Специальность */}
							<Grid size={{ xs: 12 }}>
								<TextField
									label="Специальность"
									fullWidth
									value={edu.speciality || ""}
									onChange={(e) =>
										changeForm("speciality", e.target.value, index)
									}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>

							{/* Дата начала */}
							<Grid size={{ xs: 12, md: 4 }}>
								<TextField
									type="date"
									label="Дата начала"
									fullWidth
									value={edu.startDate || ""}
									onChange={(e) =>
										changeForm("startDate", e.target.value, index)
									}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>

							{/* Дата окончания */}
							<Grid size={{ xs: 12, md: 4 }}>
								<TextField
									type="date"
									label="Дата окончания"
									fullWidth
									value={edu.endDate || ""}
									onChange={(e) =>
										changeForm("endDate", e.target.value, index)
									}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>

							{/* С отличием */}
							<Grid size={{ xs: 12, md: 4 }}>
								<FormControlLabel
									control={
										<Checkbox
											checked={!!edu.honours}
											onChange={(e) =>
												changeForm("honours", e.target.checked, index)
											}
										/>
									}
									label="С отличием"
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