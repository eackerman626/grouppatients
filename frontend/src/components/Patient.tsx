import { FC } from 'react';
import { PatientData } from '../requests/patients';
import Schedule from './Schedule';

interface PatientProps {
	patient: PatientData;
}

const Patient: FC<PatientProps> = ({ patient }) => {
	return (
		<span data-testid="patient" id={`${patient.id}`}>
			{patient.first_name} {patient.last_name}:&nbsp;
			<Schedule schedule={patient.availabilities} />
		</span>
	);
};

export default Patient;
