import { FC, useState, useEffect } from 'react';
import { PatientData, getUnassignedPatients } from '../requests/patients';
import Patient from './Patient';
import RemovePatientFromGroupButton from './RemovePatientFromGroupButton';
import { getGroupPatients, GroupData } from '../requests/groups';
import PatientGroupForm from './PatientGroupForm';

import { useAppSelector } from "../store";
import { RootState } from '../store';

interface GroupPatientProps {
	group: GroupData;
}

const GroupPatients: FC<GroupPatientProps> = (props) => {
	// don't love this, I could do frontend filtering now that I have redux set up
	const [groupPatients, setGroupPatients] = useState<PatientData[]>([]);
	const [unassignedPatients, setUnassignedPatients] = useState<PatientData[]>([]);
	const patients: PatientData[] = useAppSelector(
		(state: RootState) => state.patients
	  )

	useEffect(() => {
		(async () => {
			setGroupPatients(await getGroupPatients(props.group.id));
			setUnassignedPatients(await getUnassignedPatients());
		})();
	}, [props.group, patients]);

	const handleRemovePatientFromGroup = async (removedPatient: PatientData): Promise<void> => {
		setGroupPatients((prevGroupPatients: PatientData[]) => {
			return prevGroupPatients.filter((pat) => pat.id !== removedPatient.id);
		});
		setUnassignedPatients((prevUnassignedPatients: PatientData[]) => {
			return [...prevUnassignedPatients, removedPatient];
		});
	};

	const handleAssignPatientToGroup = (assignedPatient: PatientData): void => {
		setGroupPatients((prevGroupPatients: PatientData[]) => {
			return [...prevGroupPatients, assignedPatient];
		});
		setUnassignedPatients((prevUnassignedPatients: PatientData[]) => {
			return prevUnassignedPatients.filter((pat) => pat.id !== assignedPatient.id);
		});
	};

	return (
		<div>
			<ul>
				{groupPatients.map((patient: PatientData) => {
					return (
						<li key={patient.id}>
							{<Patient patient={patient} />}
							{<RemovePatientFromGroupButton patient={patient} onRemovePatientFromGroup={handleRemovePatientFromGroup} />}
						</li>
					);
				})}
				<li>{<PatientGroupForm group={props.group} groupPatients={groupPatients} unassignedPatients={unassignedPatients} onAssignPatientToGroup={handleAssignPatientToGroup} />}</li>
			</ul>
		</div>
	);
};

export default GroupPatients;
