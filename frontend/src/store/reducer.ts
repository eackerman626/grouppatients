import * as actionTypes from './actionTypes';
import { PatientData, getPatients } from '../requests/patients';
import { PatientAction } from './actionCreators';

export type PatientState = {
	patients: PatientData[];
};

const initialState: PatientState = {
	patients: [
		{
			id: 999,
			first_name: 'First',
			last_name: 'Last',
			availabilities: [],
			group: null,
		},
	],
};

const reducer = (state: PatientState = initialState, action: PatientAction): PatientState => {
	switch (action.type) {
		case actionTypes.ADD_PATIENT:
			const newPatient: PatientData = {
				id: Math.random(), // should implement a counter here, this does not match up with what is in the db
				first_name: action.patient.first_name,
				last_name: action.patient.last_name,
				availabilities: [],
				group: null,
			};
			return {
				...state,
				patients: state.patients.concat(newPatient),
			};
		case actionTypes.UPDATE_PATIENT:
			const updatedPatient: PatientData = {
				id: action.patient.id,
				first_name: action.patient.first_name,
				last_name: action.patient.last_name,
				availabilities: action.patient.availabilities,
				group: action.patient.group,
			};
			return {
				...state,
				patients: state.patients.map((pat) => {
					return pat.id === updatedPatient.id ? updatedPatient : pat;
				}),
			};
		case actionTypes.REMOVE_PATIENT_FROM_GROUP:
			const updatedPatients: PatientData[] = state.patients.filter((pat) => pat.id !== action.patient.id);
			return {
				...state,
				patients: updatedPatients,
			};
	}
	return state;
};

export default reducer;
