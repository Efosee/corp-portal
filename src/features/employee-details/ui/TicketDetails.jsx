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

export const TicketDetails = ({ data, onSave }) => {
	const { form, changeForm, changed, changedIndexs, resetFormIndex } = useFormUpdate(data);

	if (!(form instanceof Array)) {
		return null;
	} else if (!form?.length) {
		return <Typography variant="h2">Заявки не добавлены</Typography>;
	}

	return (
		<div className={styles.container}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
				{form.map((ticket, index) => (
					<Paper
						key={index}
						elevation={3}
						sx={{
							p: 3,
							backgroundColor: "#fce4ec",
						}}
					>
						<Typography variant="h6" gutterBottom>
							Заявка {index + 1}
						</Typography>

						<Grid container spacing={3}>
							{/* Название */}
							<Grid size={{ xs: 12 }}>
								<TextField
									label="Название"
									fullWidth
									value={ticket.title || ""}
									onChange={(e) =>
										changeForm("title", e.target.value, index)
									}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>

							{/* Категория */}
							<Grid size={{ xs: 12, md: 4 }}>
								<FormControl fullWidth>
									<InputLabel>Категория</InputLabel>
									<Select
										value={ticket.category || ""}
										label="Категория"
										onChange={(e) =>
											changeForm("category", e.target.value, index)
										}
									>
										{Object.entries(SELECT_FIELDS.TICKET_CATEGORY).map(([cat, label]) => (
											<MenuItem key={cat} value={cat}>
												{label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>

							{/* Приоритет */}
							<Grid size={{ xs: 12, md: 4 }}>
								<FormControl fullWidth>
									<InputLabel>Приоритет</InputLabel>
									<Select
										value={ticket.priority || ""}
										label="Приоритет"
										onChange={(e) =>
											changeForm("priority", e.target.value, index)
										}
									>
										{SELECT_FIELDS.TICKET_PRIORITIES.map((priority) => (
											<MenuItem key={priority} value={priority}>
												{priority}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>

							{/* Статус */}
							<Grid size={{ xs: 12, md: 4 }}>
								<FormControl fullWidth>
									<InputLabel>Статус</InputLabel>
									<Select
										value={ticket.status || ""}
										label="Статус"
										onChange={(e) =>
											changeForm("status", e.target.value, index)
										}
									>
										{Object.entries(SELECT_FIELDS.TICKET_STATUS).map(([status, label]) => (
											<MenuItem key={status} value={status}>
												{label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>

							{/* Дата создания */}
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField
									type="date"
									label="Дата создания"
									fullWidth
									value={ticket.createdAt || ""}
									onChange={(e) =>
										changeForm("createdAt", e.target.value, index)
									}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>

							{/* Дата обновления */}
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField
									type="date"
									label="Дата обновления"
									fullWidth
									value={ticket.updatedAt || ""}
									onChange={(e) =>
										changeForm("updatedAt", e.target.value, index)
									}
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
								/>
							</Grid>

							{/* Описание */}
							<Grid size={{ xs: 12 }}>
								<TextField
									label="Описание"
									fullWidth
									multiline
									rows={3}
									value={ticket.description || ""}
									onChange={(e) =>
										changeForm("description", e.target.value, index)
									}
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
							<ControlChangeBtn onSave={() => onSave(index)} onReset={() => resetFormIndex(index)} />
						}
					</Paper>
				))}
			</Box>
		</div>
	);
};