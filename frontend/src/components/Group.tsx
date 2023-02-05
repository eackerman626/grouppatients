import { FC, useEffect, useState } from 'react';
import { getGroupPatients, GroupData } from '../requests/groups';
import { PatientData } from '../requests/patients';
import GroupPatients from '../components/GroupPatients';

interface GroupProps {
	group: GroupData;
}

const Group: FC<GroupProps> = (props) => {
	const [groupPatients, setGroupPatients] = useState<PatientData[]>([]);

	useEffect(() => {
		(async () => {
			setGroupPatients(await getGroupPatients(props && props.group ? props.group.id : null));
		})();
	}, []);

	return (
		<span data-testid="group">
			{props.group.group_name}&nbsp;
			<span>
				<GroupPatients group={props.group} />
			</span>
		</span>
	);
};

export default Group;
