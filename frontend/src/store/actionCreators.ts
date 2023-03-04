import * as actionTypes from './actionTypes';
import { PatientData, putPatientAvailabilty } from '../requests/patients';

export type PatientAction = {
	type: string;
	patient: PatientData;
};

export type DispatchType = (args: PatientAction) => PatientAction;

export function addPatient(patient: PatientData) {
	const action: PatientAction = {
		type: actionTypes.ADD_PATIENT,
		patient,
	};

	return simulateHttpRequest(action);
}

export function updatePatient(patient: PatientData) {
	const action: PatientAction = {
		type: actionTypes.UPDATE_PATIENT,
		patient,
	};

	return simulateHttpRequest(action);
}

export function removePatientFromGroup(patient: PatientData) {
	const action: PatientAction = {
		type: actionTypes.REMOVE_PATIENT_FROM_GROUP,
		patient,
	};

	return simulateHttpRequest(action);
}

export function simulateHttpRequest(action: PatientAction) {
	return (dispatch: DispatchType) => {
		setTimeout(() => {
			dispatch(action);
		}, 500);
	};
}
