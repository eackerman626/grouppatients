import { FC, useState, useEffect } from 'react';
import { PatientData } from '../requests/patients';
import Patient from './Patient';
import RemovePatientFromGroupButton from './RemovePatientFromGroupButton';
import { getGroupPatients, GroupData } from '../requests/groups';
import PatientGroupForm from './PatientGroupForm';

interface GroupPatientProps {
	group: GroupData;
}

const GroupPatients: FC<GroupPatientProps> = (props) => {
	const [groupPatients, setGroupPatients] = useState<PatientData[]>([]);

	useEffect(() => {
		(async () => {
			setGroupPatients(await getGroupPatients(props.group.id));
		})();
	}, [props.group]);

	const handleRemovePatientFromGroup = async (removedPatient: PatientData): Promise<void> => {
		setGroupPatients((prevGroupPatients: PatientData[]) => {
			return prevGroupPatients.filter((pat) => pat.id !== removedPatient.id);
		});
	};

	const handleAssignPatientToGroup = (assignedPatient: PatientData): void => {
		setGroupPatients([...groupPatients, assignedPatient]);
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
				<li>{<PatientGroupForm group={props.group} groupPatients={groupPatients} onAssignPatientToGroup={handleAssignPatientToGroup} />}</li>
			</ul>
		</div>
	);
};

export default GroupPatients;
