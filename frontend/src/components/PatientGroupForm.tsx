import { FC, FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { PatientData, putPatientGroup, getUnassignedPatients } from '../requests/patients';
import { GroupData } from '../requests/groups';

interface AssignPatientToGroupProps {
	groups: GroupData[];
	// onAssignPatientToGroup: (patient: PatientData) => void;
}

const defaultPatient = {
		id: -1,
		first_name: '',
		last_name: '',
		availabilities: [],
	},
	defaultGroup = {
		id: -1,
		group_name: '',
	};

const PatientGroupForm: FC<AssignPatientToGroupProps> = (props) => {
	const [patient, setPatient] = useState<PatientData | undefined>(defaultPatient);
	const [group, setGroup] = useState<GroupData | undefined>(defaultGroup);
	const [unassignedPatients, setUnassignedPatients] = useState<PatientData[]>([]);

	useEffect(() => {
		(async () => {
			setUnassignedPatients(await getUnassignedPatients());
		})();
	}, []);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		if (patient && patient.id > 0 && group && group.id > 0) {
			await putPatientGroup(patient.id, group.id);
			// await props.onAssignPatientToGroup();
			setPatient(defaultPatient);
			setGroup(defaultGroup);
		}
	};

	const handleChange = () => (event: ChangeEvent<HTMLSelectElement>) => {
		switch (event.target.id) {
			case 'patient':
				const patient = unassignedPatients.find((pat) => String(pat.id) === event.target.value);
				setPatient(patient);
				break;
			case 'group':
				const group = props.groups.find((gp) => String(gp.id) === event.target.value);
				setGroup(group);
				break;
			default:
				break;
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
				<label>Group </label>
				<select name="Group" id="group" onChange={handleChange()}>
					<option value="" />
					{props.groups.map((group) => (
						<option value={group.id} key={group.id}>
							{group.group_name}
						</option>
					))}
				</select>
				<input type="submit" value="Assign" />
			</form>
		</span>
	);
};

export default PatientGroupForm;
