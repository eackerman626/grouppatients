import { PatientData } from './patients';

export interface GroupData {
	id: number;
	group_name: string;
}

export const getGroups = async (): Promise<GroupData[]> => {
	const response = await fetch('http://localhost:8000/groups');
	return await response.json();
};

export interface GroupPatientData {
	patients: PatientData[];
}

export const getGroupPatients = async (group_id: number): Promise<PatientData[]> => {
	const response = await fetch(`http://localhost:8000/groups/${group_id}/patients`);
	return await response.json();
};
