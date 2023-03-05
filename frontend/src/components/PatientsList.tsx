import { FC, useEffect, useState, useCallback } from 'react';
import AddPatientForm from './AddPatientForm';
import Patient from './Patient';
import { PatientData } from '../requests/patients';
import { getScheduleBlocks, ScheduleBlockData } from '../requests/schedule_blocks';
import AddPatientAvailabilityForm from './AddPatientAvailabilityForm';

import { useAppSelector, useAppDispatch } from '../store';

import { RootState } from '../store';
import { patientAdded, fetchPatients, patientAvailabilityUpdated } from '../store/patientSlice';

const PatientsList: FC = () => {
	const patients: PatientData[] = useAppSelector((state: RootState) => state.patients);
	const dispatch = useAppDispatch();

	const handleAddPatient = (patient: PatientData) => dispatch(patientAdded(patient));

	const [scheduleBlocks, setScheduleBlocks] = useState<ScheduleBlockData[]>([]);

	useEffect(() => {
		(async () => {
			dispatch(fetchPatients());
			setScheduleBlocks(await getScheduleBlocks());
		})();
	}, []);

	const handleAddPatientAvailability = (updatedPatient: PatientData, scheduleBlocks: ScheduleBlockData[]): void => {
		dispatch(patientAvailabilityUpdated({ patient: updatedPatient, availabilities: scheduleBlocks }));
	};

	return (
		<div>
			<h1>Patients</h1>
			<ul>
				{patients.map((patient) => {
					return (
						<li key={patient.id}>
							{patient.availabilities.length > 0 ? (
								<Patient patient={patient} />
							) : (
								<AddPatientAvailabilityForm patient={patient} scheduleBlocks={scheduleBlocks} onAddPatientAvailability={handleAddPatientAvailability} />
							)}
						</li>
					);
				})}
			</ul>
			<AddPatientForm onAddPatient={handleAddPatient} />
		</div>
	);
};

export default PatientsList;
