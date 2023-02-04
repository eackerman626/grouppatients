export interface GroupData {
	id: number;
	group_name: string;
}

export const getGroups = async (): Promise<GroupData[]> => {
	const response = await fetch('http://localhost:8000/groups');
	return await response.json();
};
