import { FC, FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { PatientData, putPatientGroup, getUnassignedPatients } from '../requests/patients';
import { GroupData } from '../requests/groups';

interface AssignPatientToGroupProps {
	group: GroupData;
	onAssignPatientToGroup: (patient: PatientData) => void;
}

const defaultPatient = {
	id: -1,
	first_name: '',
	last_name: '',
	availabilities: [],
};

const PatientGroupForm: FC<AssignPatientToGroupProps> = (props) => {
	const [patient, setPatient] = useState<PatientData | undefined>(defaultPatient);
	const [unassignedPatients, setUnassignedPatients] = useState<PatientData[]>([]);

	useEffect(() => {
		(async () => {
			setUnassignedPatients(await getUnassignedPatients());
		})();
	}, []);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		// TO-DO: figure out why setState isn't refreshing the dropdown in the UI
		if (patient && patient.id > 0) {
			await putPatientGroup(patient.id, props.group.id);
			await props.onAssignPatientToGroup(patient);
			setPatient(defaultPatient);
		}
		// TO-DO: refresh the list w/o the assigned patient
	};

	const handleChange = () => (event: ChangeEvent<HTMLSelectElement>) => {
		if (parseInt(event.target.value) > 0) {
			const patient = unassignedPatients.find((pat) => String(pat.id) === event.target.value);
			setPatient(patient);
		}
	};

	// TO-DO: gray out the Assign button if either patient or group is not selected
	return (
		<span data-testid="patient-group-form">
			<form onSubmit={handleSubmit}>
				<label>Patient </label>
				<select name="Patient" id="patient" onChange={handleChange()}>
					<option value="" />
					{unassignedPatients.map((patient) => (
						<option value={patient.id} key={patient.id}>
							{patient.first_name} {patient.last_name}
						</option>
					))}
				</select>
				<input type="submit" value="Assign" />
			</form>
		</span>
	);
};

export default PatientGroupForm;
