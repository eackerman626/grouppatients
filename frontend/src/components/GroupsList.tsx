import { FC, useEffect, useState } from 'react';
import Group from './Group';
import { getGroups, GroupData } from '../requests/groups';

const GroupsList: FC = () => {
	const [groups, setGroups] = useState<GroupData[]>([]);

	useEffect(() => {
		(async () => {
			setGroups(await getGroups());
		})();
	}, []);

	return (
		<div>
			<h1>Groups</h1>
			<ul>
				{groups.map((group) => {
					return <li key={group.id}>{<Group group={group} />}</li>;
				})}
			</ul>
		</div>
	);
};

export default GroupsList;
