import {
	Box,
	Grid,
	TextField,
	Paper,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from "@mui/material";

import { useFormUpdate } from "../model/useFormUpdate";
import styles from "../styles/employeeDetails.module.scss";
import { ControlChangeBtn } from "./ControlChangeBtn";
import { SELECT_FIELDS } from "../config/selectFields";

export const FamilyMemberDetails = ({ data, onSave }) => {
	const { form, changeForm, changed, changedIndexs, resetFormIndex } = useFormUpdate(data);

	if (!(form instanceof Array)) {
		return null;
	} else if (!form?.length) {
		return (
			<Typography variant="h2" className={styles.notFound}>
				Члены семьи не добавлены
			</Typography>
		);
	}

	return (
		<div className={styles.container}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
				{form.map((member, index) => (
					<Paper
						key={index}
						elevation={3}
						sx={{
							p: 3,
							backgroundColor: "#f3e5f5",
						}}
					>
						<Typography variant="h6" gutterBottom>
							Член семьи {index + 1}
						</Typography>

						<Grid container spacing={3}>
							{/* Степень родства */}
							<Grid size={{ xs: 12, md: 4 }}>
								<FormControl fullWidth>
									<InputLabel>Степень родства</InputLabel>
									<Select
										value={member.relation || ""}
										label="Степень родства"
										onChange={(e) =>
											changeForm("relation", e.target.value, index)
										}
									>
										{SELECT_FIELDS.RELATION_TYPES.map((relation) => (
											<MenuItem key={relation} value={relation}>
												{relation}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>

							{/* ФИО */}
							<Grid size={{ xs: 12, md: 8 }}>
								<TextField
									label="ФИО"
									fullWidth
									value={member.fullName || ""}
									onChange={(e) => changeForm("fullName", e.target.value, index)}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>

							{/* Дата рождения */}
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField
									type="date"
									label="Дата рождения"
									fullWidth
									value={member.birthDate || ""}
									onChange={(e) =>
										changeForm("birthDate", e.target.value, index)
									}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>

							{/* Телефон */}
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField
									label="Телефон"
									fullWidth
									value={member.phone || ""}
									onChange={(e) => changeForm("phone", e.target.value, index)}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>
						</Grid>
						{
							changed && changedIndexs.includes(index) &&
							<ControlChangeBtn onSave={() => onSave(member.id, member, index)} onReset={() => resetFormIndex(index)} />
						}
					</Paper>
				))}
			</Box>
		</div>
	);
};