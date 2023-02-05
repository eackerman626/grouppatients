import { FC, useState, useEffect } from 'react';
import { PatientData } from '../requests/patients';
import Patient from './Patient';
import RemovePatientFromGroupButton from './RemovePatientFromGroupButton';
import { getGroupPatients, GroupData } from '../requests/groups';

interface GroupPatientProps {
	group: GroupData;
}

const GroupPatients: FC<GroupPatientProps> = (props) => {
	const [groupPatients, setGroupPatients] = useState<PatientData[]>([]);

	useEffect(() => {
		(async () => {
			if (props.group) {
				setGroupPatients(await getGroupPatients(props.group.id));
			}
		})();
	}, []);

	const handleRemovePatientFromGroup = async (): Promise<void> => {
		setGroupPatients(await getGroupPatients(props.group.id));
	};

	return (
		<div data-testid="group-patients">
			{
				<ul>
					{groupPatients.map((patient: PatientData) => {
						return (
							<li key={patient.id}>
								{<Patient patient={patient} />}
								{<RemovePatientFromGroupButton patient={patient} onRemovePatientFromGroup={handleRemovePatientFromGroup} />}
							</li>
						);
					})}
				</ul>
			}
		</div>
	);
};

export default GroupPatients;
