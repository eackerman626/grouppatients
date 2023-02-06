import { FC, FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { PatientData, putPatientGroup, getUnassignedPatients } from '../requests/patients';
import { GroupData } from '../requests/groups';
import { ScheduleBlock } from './Schedule';

interface AssignPatientToGroupProps {
	group: GroupData;
	groupPatients: PatientData[];
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
	const [availablePatients, setAvailablePatients] = useState<PatientData[]>([]);

	useEffect(() => {
		(async () => {
			const unassignedPatients = await getUnassignedPatients();
			setAvailablePatients(unassignedPatients.filter((pat) => doesPatientHaveOverlap(pat, props.groupPatients)));
		})();
	}, [props.groupPatients]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		if (patient && patient.id > 0) {
			await putPatientGroup(patient.id, props.group.id);
			props.onAssignPatientToGroup(patient);
			setPatient(defaultPatient);
		}
	};

	function doesPatientHaveOverlap(patient: PatientData, existingPatients: PatientData[]) {
		const patCheckSumAry = checkSumAry(patient.availabilities);
		const allAvailabilities = [];
		if (!existingPatients.length) {
			allAvailabilities.push([]);
		} else {
			for (let pat of existingPatients) {
				allAvailabilities.push(checkSumAry(pat.availabilities));
			}
		}
		const overlappingAvailabilities = allAvailabilities.reduce((accum, curr) => accum.filter((el) => curr.includes(el)), patCheckSumAry);
		return overlappingAvailabilities.length >= 3;
	}

	function checkSumAry(availabilities: ScheduleBlock[]) {
		return availabilities.map((availability) => availability.day_of_week + availability.start_time + availability.end_time);
	}

	const handleChange = () => (event: ChangeEvent<HTMLSelectElement>) => {
		if (parseInt(event.target.value) > 0) {
			const patient = availablePatients.find((pat: PatientData) => String(pat.id) === event.target.value);
			setPatient(patient);
		} else {
			setPatient(defaultPatient);
		}
	};

	return (
		<span>
			<form onSubmit={handleSubmit}>
				<label>Add Patient to Group: </label>
				<select name="Patient" id={`select-patient-${props.group.id}`} style={{ width: 150 }} onChange={handleChange()}>
					<option value={-1} />
					{availablePatients.map((patient) => (
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
