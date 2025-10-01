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
	Paper,
	Typography
} from "@mui/material";

import { SELECT_FIELDS } from "../config/selectFields";
import { useFormUpdate } from "../model/useFormUpdate";
import styles from "../styles/employeeDetails.module.scss";
import { ControlChangeBtn } from "./ControlChangeBtn";

export const DocumentDetails = ({ data, onSave }) => {

	const { form, changeForm, changed, changedIndexs, resetFormIndex } = useFormUpdate(data);

	if (!(form instanceof Array)) {
		return null
	} else if (!form?.length) {
		return <Typography variant="h2" className={styles.notFound} >Документы не добавлены</Typography>;
	}

	return (
		<div className={styles.container}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
				{form.map((doc, index) => (
					<Paper
						key={index}
						elevation={3}
						sx={{
							p: 3,
							backgroundColor: "#e3f2fd", // светло-синий фон в стиле MUI
						}}
					>
						<Typography variant="h6" gutterBottom>
							Документ {index + 1}
						</Typography>

						<Grid container spacing={3}>
							{/* Тип документа */}
							<Grid size={{ xs: 12, md: 4 }}>
								<FormControl fullWidth>
									<InputLabel>Тип документа</InputLabel>
									<Select
										value={doc.docType || ""}
										label="Тип документа"
										onChange={(e) =>
											changeForm("docType", e.target.value, index)
										}
									>
										{SELECT_FIELDS.DOC_TYPES.map((t) => (
											<MenuItem key={t} value={t}>
												{t}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>

							{/* Серия */}
							<Grid size={{ xs: 12, md: 4 }}>
								<TextField
									label="Серия"
									fullWidth
									value={doc.series || ""}
									onChange={(e) => changeForm("series", e.target.value, index)}
								/>
							</Grid>

							{/* Номер */}
							<Grid size={{ xs: 12, md: 4 }}>
								<TextField
									label="Номер"
									fullWidth
									value={doc.number || ""}
									onChange={(e) => changeForm("number", e.target.value, index)}
								/>
							</Grid>

							{/* Дата выдачи */}
							<Grid size={{ xs: 12, md: 4 }}>
								<TextField
									type="date"
									label="Дата выдачи"
									fullWidth
									value={doc.issueDate || ""}
									onChange={(e) =>
										changeForm("issueDate", e.target.value, index)
									}
								/>
							</Grid>

							{/* Кем выдан */}
							<Grid size={{ xs: 12, md: 4 }}>
								<TextField
									label="Кем выдан"
									fullWidth
									value={doc.issuedBy || ""}
									onChange={(e) =>
										changeForm("issuedBy", e.target.value, index)
									}
								/>
							</Grid>

							{/* Действителен */}
							<Grid size={{ xs: 12, md: 4 }}>
								<FormControlLabel
									control={
										<Checkbox
											checked={!!doc.valid}
											onChange={(e) =>
												changeForm("valid", e.target.checked, index)
											}
										/>
									}
									label="Действителен"
								/>
							</Grid>
						</Grid>
						{
							changed && changedIndexs.includes(index) &&
							<ControlChangeBtn onSave={() => onSave(doc.id, doc, index)} onReset={() => resetFormIndex(index)} />
						}
					</Paper>
				))}
			</Box>
		</div>
	);
};
