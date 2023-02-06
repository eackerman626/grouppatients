import { FC } from 'react';
import { GroupData } from '../requests/groups';
import GroupPatients from '../components/GroupPatients';

interface GroupProps {
	group: GroupData;
}

const Group: FC<GroupProps> = (props) => {
	return (
		<span>
			{props.group.group_name}&nbsp;
			<span>
				<GroupPatients group={props.group} />
			</span>
		</span>
	);
};

export default Group;
