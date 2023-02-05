import { ScheduleBlockData } from './schedule_blocks';
import { GroupData } from './groups';

export interface PatientData {
	id: number;
	first_name: string;
	last_name: string;
	availabilities: ScheduleBlockData[];
}

export interface PostPatientsPayload {
	first_name: string;
	last_name: string;
}

export const getPatients = async (): Promise<PatientData[]> => {
	const response = await fetch('http://localhost:8000/patients');
	return await response.json();
};

export const postPatients = async (payload: PostPatientsPayload): Promise<PatientData> => {
	const response = await fetch('http://localhost:8000/patients', {
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify(payload),
	});
	return await response.json();
};

export const putPatientAvailabilty = async (patient_id: number, payload: number[]): Promise<ScheduleBlockData[]> => {
	const response = await fetch(`http://localhost:8000/patients/${patient_id}/availabilities`, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify(payload),
	});
	return await response.json();
};

// from this line down is what I added, the rest of the changes were formatting from my linter
export const removePatientFromGroup = async (patient_id: number): Promise<Boolean> => {
	const response = await fetch(`http://localhost:8000/patients/${patient_id}/remove-group`, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	});
	return await response.json();
};

export const putPatientGroup = async (patient_id: number, payload: number): Promise<GroupData> => {
	const response = await fetch(`http://localhost:8000/patients/${patient_id}/group`, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify({ group_id: payload }),
	});
	return await response.json();
};

export const getUnassignedPatients = async (): Promise<PatientData[]> => {
	const response = await fetch('http://localhost:8000/patients/unassigned');
	return await response.json();
};
