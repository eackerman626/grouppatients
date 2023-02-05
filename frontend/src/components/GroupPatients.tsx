import { FC } from 'react';
import { PatientData } from '../requests/patients';
import Patient from './Patient';

interface GroupPatientProps {
	patients: PatientData[];
}

const GroupPatients: FC<GroupPatientProps> = (props) => {
	return (
		<div data-testid="group-patients">
			{
				<ul>
					{props.patients.map((patient: PatientData) => {
						return <li key={patient.id}>{<Patient patient={patient} />}</li>;
					})}
				</ul>
			}
		</div>
	);
};

export default GroupPatients;
