import { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import GroupIcon from '@mui/icons-material/Group';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import CakeIcon from '@mui/icons-material/Cake';

import { employeeApi, ticketsApi, documentApi, educationApi } from '../../../entities';
import { analyticsApi } from '../../../entities/analytics/api/analyticsApi';
import { MetricCard } from '../../../shared/ui/metric-card/MetricCard';
import styles from '../styles/dashboard.module.scss';
import {SETTINGS} from '../config/settings';
import { pluralYear } from '../../../shared/lib';

export const Dashboard = () => {
	const [metrics, setMetrics] = useState({
		totalEmployees: 0,
		activeTickets: 0,
		totalDocuments: 0,
		totalEducations: 0,
		medianAge: 0
	});

	const [genderData, setGenderData] = useState([]);
	const [departmentData, setDepartmentData] = useState([]);
	const [ticketStatusData, setTicketStatusData] = useState([]);
	const [documentValidityData, setDocumentValidityData] = useState([]);
	const [ageDistributionData, setAgeDistributionData] = useState([]);
	const [analyticsData, setAnalyticsData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadDashboardData();
	}, []);

	const loadDashboardData = async () => {
		try {
			setLoading(true);

			//Метрики (для карточек)
			const [totalEmp, activeTickets, totalDocs, totalEdu, medianAge] = await Promise.all([
				employeeApi.getTotalCount(),
				ticketsApi.getTotalCountActive(),
				documentApi.getTotalCount(),
				educationApi.getTotalCount(),
				employeeApi.getMedianAgeEmployees()
			]);

			setMetrics({
				totalEmployees: totalEmp,
				activeTickets,
				totalDocuments: totalDocs,
				totalEducations: totalEdu,
				medianAge
			});

			//Данные для диаграмм
			const [genderCounts, deptCounts, ticketStatuses, docValidity, analytics] = await Promise.all([
				loadGenderData(),
				employeeApi.getDepartmentsTotalCount(),
				ticketsApi.getStatusesTotalCount(),
				documentApi.getDocumentsValidityCount(),
				analyticsApi.getEmployeesByYear()
			]);

			setGenderData(genderCounts);
			setDepartmentData([
				{ name: 'HR', value: deptCounts.hr },
				{ name: 'IT', value: deptCounts.it },
				{ name: 'Support', value: deptCounts.support },
				{ name: 'Finance', value: deptCounts.finance },
				{ name: 'Marketing', value: deptCounts.marketing }
			]);

			setTicketStatusData([
				{ name: 'Открыт', value: ticketStatuses.open },
				{ name: 'В работе', value: ticketStatuses.in_progress },
				{ name: 'Решен', value: ticketStatuses.resolved }
			]);

			setDocumentValidityData([
				{ name: 'Действительные', value: docValidity.valid },
				{ name: 'Недействительные', value: docValidity.invalid }
			]);

			setAnalyticsData(analytics.map(a => ({
				year: a.year,
				employees: a.employees
			})));

			//Распределение по возрасту
			const ageCounts = await Promise.all(
				SETTINGS.AGE_RANGES.map(async range => ({
					name: range.label,
					count: await employeeApi.getTotalCountByRange({ birthDate: { gte: range.gte, lte: range.lte } })
				}))
			);

			setAgeDistributionData(ageCounts);

		} catch (error) {
			console.error('Ошибка загрузки данных дашборда:', error);
		} finally {
			setLoading(false);
		}
	};

	const loadGenderData = async () => {
		const [maleCount, femaleCount] = await Promise.all([
			employeeApi.getTotalCount({ gender: 'male' }),
			employeeApi.getTotalCount({ gender: 'female' })
		]);

		return [
			{ name: 'Мужчины', value: maleCount },
			{ name: 'Женщины', value: femaleCount }
		];
	};

	return (
		<Box className={styles.dashboard}>
			<Typography variant="h4" className={styles.title}>
				Панель управления
			</Typography>

			{/* Метрики */}
			<Grid container spacing={3} className={styles.metricsGrid}>
				<Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
					<MetricCard
						title="Всего сотрудников"
						value={metrics.totalEmployees}
						gradient={`linear-gradient(135deg, ${SETTINGS.COLORS.blue[0]} 0%, ${SETTINGS.COLORS.blue[1]} 100%)`}
						icon={GroupIcon}
						isLoading={loading}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
					<MetricCard
						title="Активные заявки helpdesk"
						value={metrics.activeTickets}
						gradient={`linear-gradient(135deg, ${SETTINGS.COLORS.red[0]} 0%, ${SETTINGS.COLORS.red[1]} 100%)`}
						icon={ConfirmationNumberIcon}
						isLoading={loading}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
					<MetricCard
						title="Документов в системе"
						value={metrics.totalDocuments}
						gradient={`linear-gradient(135deg, ${SETTINGS.COLORS.purple[0]} 0%, ${SETTINGS.COLORS.purple[1]} 100%)`}
						icon={DescriptionIcon}
						isLoading={loading}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
					<MetricCard
						title="Образований сотрудников"
						value={metrics.totalEducations}
						gradient={`linear-gradient(135deg, ${SETTINGS.COLORS.green[0]} 0%, ${SETTINGS.COLORS.green[1]} 100%)`}
						icon={SchoolIcon}
						isLoading={loading}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
					<MetricCard
						title="Средний возраст сотрудников"
						value={`${metrics.medianAge} ${pluralYear(metrics.medianAge)}`}
						gradient={`linear-gradient(135deg, ${SETTINGS.COLORS.orange[0]} 0%, ${SETTINGS.COLORS.orange[1]} 100%)`}
						icon={CakeIcon}
						isLoading={loading}
					/>
				</Grid>
			</Grid>

			{/* Круговые диаграммы */}
			<Grid container spacing={3} className={styles.chartsGrid}>
				<Grid size={{ xs: 12, md: 6 }}>
					<Paper className={styles.chartCard}>
						<Typography variant="h6" className={styles.chartTitle}>
							Сотрудники по полу
						</Typography>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={genderData}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
								>
									{genderData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={SETTINGS.PIE_COLORS[index % SETTINGS.PIE_COLORS.length]} />
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</Paper>
				</Grid>

				<Grid size={{ xs: 12, md: 6 }}>
					<Paper className={styles.chartCard}>
						<Typography variant="h6" className={styles.chartTitle}>
							Сотрудники по департаментам
						</Typography>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={departmentData}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={({ name, value }) => `${name}: ${value}`}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
								>
									{departmentData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={SETTINGS.PIE_COLORS[index % SETTINGS.PIE_COLORS.length]} />
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</Paper>
				</Grid>

				<Grid size={{ xs: 12, md: 6 }}>
					<Paper className={styles.chartCard}>
						<Typography variant="h6" className={styles.chartTitle}>
							Заявки по статусам
						</Typography>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={ticketStatusData}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={({ name, value }) => `${name}: ${value}`}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
								>
									{ticketStatusData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={SETTINGS.PIE_COLORS[index % SETTINGS.PIE_COLORS.length]} />
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</Paper>
				</Grid>

				<Grid size={{ xs: 12, md: 6 }}>
					<Paper className={styles.chartCard}>
						<Typography variant="h6" className={styles.chartTitle}>
							Валидность документов
						</Typography>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={documentValidityData}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={({ name, value }) => `${name}: ${value}`}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
								>
									{documentValidityData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={SETTINGS.PIE_COLORS[index % SETTINGS.PIE_COLORS.length]} />
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</Paper>
				</Grid>
			</Grid>

			{/* Столбчатая диаграмма */}
			<Grid container spacing={3}>
				<Grid size={{ xs: 12 }}>
					<Paper className={styles.chartCard}>
						<Typography variant="h6" className={styles.chartTitle}>
							Распределение сотрудников по годам рождения
						</Typography>
						<ResponsiveContainer width="100%" height={350}>
							<BarChart data={ageDistributionData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="count" fill="#2196F3" name="Количество сотрудников" />
							</BarChart>
						</ResponsiveContainer>
					</Paper>
				</Grid>
			</Grid>

			{/* Линейный график */}
			<Grid container spacing={3}>
				<Grid size={{ xs: 12 }}>
					<Paper className={styles.chartCard}>
						<Typography variant="h6" className={styles.chartTitle}>
							Динамика роста численности сотрудников
						</Typography>
						<ResponsiveContainer width="100%" height={350}>
							<LineChart data={analyticsData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="year" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line 
									type="monotone" 
									dataKey="employees" 
									stroke="#2196F3" 
									strokeWidth={3}
									dot={{ fill: '#2196F3', r: 6 }}
									activeDot={{ r: 8 }}
									name="Сотрудники"
								/>
							</LineChart>
						</ResponsiveContainer>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};