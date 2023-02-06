import { FC, useState, useEffect } from 'react';
import { PatientData, getUnassignedPatients } from '../requests/patients';
import Patient from './Patient';
import RemovePatientFromGroupButton from './RemovePatientFromGroupButton';
import { getGroupPatients, GroupData } from '../requests/groups';
import PatientGroupForm from './PatientGroupForm';

interface GroupPatientProps {
	group: GroupData;
}

const GroupPatients: FC<GroupPatientProps> = (props) => {
	const [groupPatients, setGroupPatients] = useState<PatientData[]>([]);
	const [unassignedPatients, setUnassignedPatients] = useState<PatientData[]>([]);

	useEffect(() => {
		(async () => {
			setGroupPatients(await getGroupPatients(props.group.id));
			setUnassignedPatients(await getUnassignedPatients());
		})();
	}, [props.group]);

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
