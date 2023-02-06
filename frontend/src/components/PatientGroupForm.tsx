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
			await props.onAssignPatientToGroup(patient);
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
			const patient = availablePatients.find((pat) => String(pat.id) === event.target.value);
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
