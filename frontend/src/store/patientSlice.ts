import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PatientData } from '../requests/patients';
import { ScheduleBlockData } from '../requests/schedule_blocks';
import { GroupData } from '../requests/groups';

interface PatientState {
	patients: PatientData[];
}

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

const patientsSlice = createSlice({
	name: 'patients',
	initialState,
	reducers: {
		patientAdded(state: PatientState, action: PayloadAction<PatientData>) {
			const newPatient: PatientData = {
				id: Math.random(), // should implement a counter here, this does not match up with what is in the db
				first_name: action.payload.first_name,
				last_name: action.payload.last_name,
				availabilities: [],
				group: null,
			};
			state.patients.push(newPatient);
		},
		patientAvailabilityUpdated(state: PatientState, action: PayloadAction<{ patient: PatientData; availabilities: ScheduleBlockData[] }>) {
			const matchingPatient = state.patients.find((pat) => pat.id === action.payload.patient.id);

			if (matchingPatient) {
				matchingPatient.availabilities = action.payload.availabilities;
			}
		},
		patientGroupUpdated(state: PatientState, action: PayloadAction<{ patient: PatientData; group: GroupData }>) {
			const matchingPatient = state.patients.find((pat) => pat.id === action.payload.patient.id);

			if (matchingPatient) {
				matchingPatient.group = action.payload.group;
			}
		},
		patientGroupRemoved(state: PatientState, action: PayloadAction<{ patient: PatientData }>) {
			const matchingPatient = state.patients.find((pat) => pat.id === action.payload.patient.id);

			if (matchingPatient) {
				matchingPatient.group = null;
			}
		},
	},
});

export const { patientAdded, patientAvailabilityUpdated, patientGroupRemoved, patientGroupUpdated } = patientsSlice.actions;

export default patientsSlice.reducer;
