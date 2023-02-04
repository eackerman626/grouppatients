import { FC } from 'react';
import { GroupData } from '../requests/groups';

interface GroupProps {
	group: GroupData;
}

const Group: FC<GroupProps> = ({ group }) => {
	return <span data-testid="group">{group.group_name}&nbsp;</span>;
};

export default Group;
