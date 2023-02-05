import { FC, useEffect, useState } from 'react';
import Group from './Group';
import { getGroups, GroupData } from '../requests/groups';
import PatientGroupForm from './PatientGroupForm';

const GroupsList: FC = () => {
	const [groups, setGroups] = useState<GroupData[]>([]);

	useEffect(() => {
		(async () => {
			setGroups(await getGroups());
		})();
	}, []);

	// const handleAddGroup = (group: GroupData): void => {
	// 	setGroupss([...groups, group]);
	// };

	// const handleAddPatientToGroup = {...add this later}

	return (
		<div>
			<h1>Groups</h1>
			<ul>
				{groups.map((group) => {
					return <li key={group.id}>{<Group group={group} />}</li>;
				})}
			</ul>
			<h2>Assign Patient to Group</h2>
			<PatientGroupForm groups={groups} />
		</div>
	);
};

export default GroupsList;
