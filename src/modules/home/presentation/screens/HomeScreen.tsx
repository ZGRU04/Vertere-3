import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, ViewStyle } from 'react-native';

import { globalStyle } from '../../../../themes/GlobalStyles'
import { getData } from '../../../../utils/StorageService'
import { DayAttendance } from '../../data/model/DayAttendance.model';
import { Employe } from '../../data/model/Employe.model';
import { LocationService } from '../../service/LocationService'
import { DateUtils } from '../../../../utils/DateUtil.utils';
import { ToastService } from '../../../shared/services/Toast/ToastService'
import { createWorkingHourUseCase } from '../../domain/usecases/createWorkingHourUseCase';
import { WorkingHour } from '../../data/model/WorkingHours.model';
import { WorkingHourStateEnum } from '../../domain/enums/workingHour.enum'
import { updateWorkingHourUseCase } from '../../domain/usecases/updateWorkingHourUseCase'
import { fetchAllWorkingHoursUseCase } from '../../domain/usecases/fetchAllWorkingHoursUseCase'
import { fetchDayAttendanceForEmployeUseCase } from '../../domain/usecases/dayAttendance/fetchDayAttendanceForEmployeUseCase'
import { brandService } from '../../service/BreandOfficeService'
import { updateDayAttendanceUseCase } from '../../domain/usecases/dayAttendance/updateDayAttendanceUseCase'
import { DayAttendanceStatusEnum } from '../../domain/enums/dayAttendanceStatus.enum'
import { StatusBadge } from '../../../shared/components/StatusBadge'
import { BranchOffice } from '../../data/model/BranchOffice.model';
import { CustomButton } from '../../../shared/components/CustomButton'
import { useLocalSearchParams } from 'expo-router'
import { getAllDayAttendanceUSeCase } from '../../domain/usecases/dayAttendance/getAllDayAttendanceUseCase';

export const HomeScreen = () => {
    const logo = require('../../../../../assets/images/masser-logo.jpg');
	const { scanned } = useLocalSearchParams();
	const [employe, setEmploye] = useState<Employe | null>(null);
	const [dayAttendance, setDayAttendance] = useState<DayAttendance | null>(null);
	const [branchOffice, setBranchOffice] = useState<BranchOffice | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [isDayFounded, setIsDayFounded] = useState<boolean>(true);
	const [haveDetail, setHaveDetail] = useState<boolean>(false);
	const [currentLatitude, setCurrentLatitude] = useState<number>(0);
	const [currentLongitude, setCurrentLongitude] = useState<number>(0);
	const [currentDistance, setCurrentDistance] = useState<number>(0);
	const [radio, setRadio] = useState<number>(80);
	
	const employeKey = 'temporalUserDetail';

	useEffect(() => {
		const fetchDayAttendance = async () => {
			try {
				await initializeScreen();
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchDayAttendance();
	}, [scanned]);

	const initializeScreenTwo = async () => {
		const employeUser = await loadUserDetailData();
		const isPendingWorking = await getDayAttendances();

	}

	const getDayAttendances = async () => {
		try {
			const currentDay = DateUtils.getCurrentDate();
			const yesterday = DateUtils.getYesterdayDate();
			
			const queryParams = {
				employee_id: employe?.id,
				initial_date: yesterday,
				end_date: currentDay
			}
			const day_attendances: DayAttendance[] = await getAllDayAttendanceUSeCase(queryParams);

			console.log(day_attendances)
			
			if (day_attendances.length === 0) {
				setIsDayFounded(false);
				return null;
			}

			if (day_attendances.length === 1) {
				if (day_attendances[0].date === currentDay) {
					setDayAttendance(day_attendances[0]);
					setIsDayFounded(true);
					return day_attendances[0];
				} else {
					if (day_attendances[0].status === DayAttendanceStatusEnum.STARTED) {
						setDayAttendance(day_attendances[0]);
						setIsDayFounded(true);
						return day_attendances[0];
					}
				}
				// verificamos si es del dia de hoy 
				// SI = agregamos
				// NO = verificamos si esta en iniciado para mostrarlo, sino returnar null 
				setIsDayFounded(true);
				setDayAttendance(day_attendances[0]);
				return day_attendances[0];
			}
		} catch (error) {
			setIsDayFounded(false);
			return null;
		} finally {
			setLoading(false);
		}
	}
	
	const initializeScreen = async () => {
		const employeUser = await loadUserDetailData();
		const day = await loadDayAttendance(employeUser);
		if (day) {
			await loadBranchOffice(day);
		} else {
			setIsDayFounded(false);
		}
		setLoading(false)
	};

	const loadUserDetailData = async () => {
		const temporalClient: any | null = await getData(employeKey) as any | null;
		const currentEmploye: Employe = temporalClient.employe;
		setEmploye(currentEmploye);
		return currentEmploye;
	};

	const loadDayAttendance = async (employeParam: Employe) => {
		try {
			const currentDay = DateUtils.getCurrentDate();
			const queryParams = {
				employe_id: employeParam.id,
				current_day: currentDay
			}
			const day_attendance: DayAttendance = await fetchDayAttendanceForEmployeUseCase(queryParams);
			if (day_attendance.message) {
				return null;
			} else {
				setDayAttendance(day_attendance);
				return day_attendance;
			}
		} catch (error) {
			setIsDayFounded(false);
			return null;
		} finally {
			setLoading(false);
		}
	};

	const loadBranchOffice = async (dayAttendanceParam: DayAttendance) => {
		try {
			const branch_office = await brandService.getById(dayAttendanceParam?.branch_office_id);
			await setBranchOffice(branch_office);
		} catch (error) {
			console.log(error)
		}
	};
	
	const isDeviceInRangeLocation = async () => {
		try {
			const deviceLocation = await LocationService.getCurrentLocation();
			setCurrentLatitude(deviceLocation.latitude);
			setCurrentLongitude(deviceLocation.longitude);
			const officeLat = branchOffice?.latitude;
			const officeLong = branchOffice?.longitude;
			//-17.353735, -66.187336
			// const la = -17.3536264
			// const lo = -66.18732771
			if (!deviceLocation) {
				throw new Error("Dispositivo no registrado.");
			}
			const {withinRadius, distance, radius} = LocationService.isWithinRadius(
				officeLat!,
				officeLong!,
				//la,
				//lo,
				deviceLocation.latitude,
				deviceLocation.longitude,
				radio
			);
			setCurrentDistance(distance);
			return withinRadius;
		} catch (error) {
			console.error('Error al verificar la ubicación:', error);
		}
	};

	const submit = async () => {
		setHaveDetail(false);
		setLoading(true);
		await reloadBrandOfficce();
		const isDeviceInRange = await isDeviceInRangeLocation();
		if (dayAttendance && isDeviceInRange ) {
			if (dayAttendance.working_hours.length > 0) {
				const workingHourFounded = dayAttendance.working_hours
					.find((workingHour)=>(workingHour.state === WorkingHourStateEnum.STARTED));
				if (workingHourFounded) {
					await finishedWorkingHour(workingHourFounded.id as number, workingHourFounded);
					await updateDayAttendanceWork(DayAttendanceStatusEnum.COMPLETED);
					ToastService.successToast(`Se marco la salida del trabajo.`);
				} else {
					await createNewWorkingHour();
					await updateDayAttendanceWork(DayAttendanceStatusEnum.STARTED)
					ToastService.successToast(`Se inicio el turno de trabajo correctamente.`);
				}
			} else {
				await createNewWorkingHour();
				await updateDayAttendanceWork(DayAttendanceStatusEnum.STARTED)
				ToastService.successToast(`Se inicio el turno de trabajo correctamente.`);
			}
		} else {
			ToastService.errorToast(`No se encuentra en la sucursal de trabajo.`);
			setLoading(false);
			setHaveDetail(true);
		}
	};

	const reloadBrandOfficce = async () => {
		await loadBranchOffice(dayAttendance as DayAttendance);
	}

	const createNewWorkingHour = async () => {
		const currentDate = DateUtils.getCurrentDateAndHour();
		const workingHourData: WorkingHour = {
			init_hour: currentDate,
			state: WorkingHourStateEnum.STARTED,
			finish_hour: null,
			day_attendance_id: dayAttendance?.id
		}
		try {
			await createWorkingHourUseCase(workingHourData);
		} catch (error: any) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	};

	const finishedWorkingHour = async (id: number, workingHour: WorkingHour) => {
		const finishDate = DateUtils.getCurrentDateAndHour();
		const totalHours = DateUtils.getHoursBetweenDates(workingHour.init_hour as string, finishDate);
		const workingHourPayload: WorkingHour = {
			init_hour: workingHour.init_hour,
			finish_hour: finishDate,
			state: WorkingHourStateEnum.COMPLETED,
			total_hours: totalHours
		}
		await updateWorkingHour(id, workingHourPayload);
	};

	const updateWorkingHour = async (id: number, payload: WorkingHour) => {
		try {
			await updateWorkingHourUseCase(id, payload)
		} catch (error: any) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	};

	const updateDayAttendanceWork = async (status: DayAttendanceStatusEnum) => {
		setLoading(true)
		const dayAttendancePayload = {...dayAttendance as Partial<DayAttendance>};
		
		if (status === DayAttendanceStatusEnum.COMPLETED) {
			const workingHours: WorkingHour[] = await loadAllWorkingHours();
			const totalHoursWorked = calculateTotalHoursWorked(workingHours);
			const initHour = workingHours[0].init_hour as string;
			const finHour = workingHours[workingHours.length-1].finish_hour as string;
			
			dayAttendancePayload.total_hours = parseFloat(totalHoursWorked.toFixed(3));
			dayAttendancePayload.time_ini = DateUtils.getHMSFormat(initHour);
			dayAttendancePayload.time_end = DateUtils.getHMSFormat(finHour);
			dayAttendancePayload.status = status;
		}
		
		if (status === DayAttendanceStatusEnum.STARTED) {
			dayAttendancePayload.status = status
		}
		
		try {
			const dayAttendanceUpdated: any = await updateDayAttendanceUseCase(dayAttendance?.id as string, dayAttendancePayload);
			const day: DayAttendance = dayAttendanceUpdated;
			setDayAttendance((prevDayAttendance) => {
				if (!prevDayAttendance) return null;
				const newData = new DayAttendance({
					...prevDayAttendance,
					status: day.status,
					working_hours: day.working_hours,
					total_hours: day.total_hours,
				  });
				return newData;
			  });
		}  catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	};

	const calculateTotalHoursWorked = (workingHours: WorkingHour[]): number => {
		let totalHoursWorked = 0;
		for (const workHour of workingHours) {
			if (workHour.total_hours) {
				totalHoursWorked = totalHoursWorked + workHour?.total_hours;
			}
		}
		return totalHoursWorked;
	};
	
	const loadAllWorkingHours = async ():Promise<WorkingHour[]> => {
		const workingHoursResponse: any = await fetchAllWorkingHoursUseCase({day_attendance_id: dayAttendance?.id});
		const workingHours: WorkingHour[] = workingHoursResponse;
		return workingHours;
	};

	return (
		<View style={globalStyle.container} >
			<View style={styles.spaceBeetween}>
				<View style={styles.upperSection}>
					<View style={styles.imageRow}>
						<Image
							source={logo}
							style={styles.logo}
						/>			
							{
								isDayFounded ? (
									<>
										<View style={styles.row}>
											<Text style={styles.label}>Dia de trabajo:</Text>
											<Text style={styles.dateValue}>
												{loading ? (
													<ActivityIndicator size="small" color="red" style={styles.spinner} />
												) : (
													DateUtils.changeYearMonthDayFormatToDayMonthYear(dayAttendance?.date)
												)}
											</Text>
										</View>
										<View style={styles.row}>
											<Text style={styles.label}>Estado de trabajo:</Text>
											<Text style={styles.value}>
												{loading ? (
													<ActivityIndicator size="small" color="red" style={styles.spinner} />
												) : (
													<StatusBadge status={dayAttendance?.status as DayAttendanceStatusEnum} />
												)}
											</Text>
										</View>
										<View style={styles.row}>
											<Text style={styles.label} >Horas trabajadas:</Text>
											<Text style={styles.dateValue} >
												{
													loading ? (
														<ActivityIndicator size="small" color="red" style={styles.spinner} />
													) : (
														DateUtils.changeNumberToHoursAndMinutes(dayAttendance?.total_hours)
													)
												}
											</Text>
										</View>
										{
											haveDetail ? (
												<View style={styles.rowColumn}>
												<Text style={styles.label} >Geolocalizacion:</Text>
												<Text style={styles.errorContainer}>
													<Text>  Latitud: {currentLatitude}</Text>
													<Text>  Longitud: {currentLongitude}</Text>
													<Text>  Te encuantras a {Math.round(currentDistance - radio)}m de la sucursal debes estar a menos de {Math.round(radio)}m</Text>
												</Text>
											</View>
											) : ('')
										}
									</>
								) : (
									<View style={styles.rowCenter}>
										<Text style={styles.dayNotFound}>No fue asignado a  una plantilla de trabajo</Text>
									</View>
								)
							}
					</View>
			</View>
				<View style={styles.lowerSection}>
					<View>
						<CustomButton
							loading={loading}
							disabled={loading || !isDayFounded}
							onPress={submit}
						>
							{
								dayAttendance?.status === DayAttendanceStatusEnum.STARTED ?
									'Finalizar trabajo' : 'Iniciar trabajo'
							}
						</CustomButton>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	logo: {
        width: '100%',
		maxHeight: 130,
        resizeMode: 'contain',
		marginBottom: 25
    },

	infoContainer: {
		marginTop: 5
	},

	row: {
		flexDirection: 'row',
		width: '100%',
		marginBottom: 15,
		alignItems: 'baseline',
		justifyContent: 'space-between'
	},

	rowColumn: {
		width: '100%',
		marginBottom: 15,
	},

	rowCenter: {
		flex: 1,
		textAlign: 'center',
		marginTop: '25%'
	},

	imageRow: {
		flex: 1,
		alignItems: 'center',
	},

	label: {
		fontSize: 18,
		fontWeight: 600,
		marginBottom: 5,
		width: '65%'
	},

	value: {
		fontSize: 16,
		marginBottom: 20,
	},

	dateValue: {
		fontSize: 20,
		marginBottom: 20,
		fontWeight: 700
	},

	spaceBeetween: {
		flex: 1,
		justifyContent: 'space-between'
	},

	upperSection: {
		flex: 1,
		justifyContent: 'flex-start',
		marginTop: 40,
	},

	lowerSection: {
		justifyContent: 'flex-end',
		paddingBottom: 40,
	},
	spinner: {
        marginTop: 20,
    },
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dayNotFound: {
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'gray',
	},
	errorContainer: {
		display: 'flex',
		flexDirection: 'column',
		color: 'red',
	}
});
