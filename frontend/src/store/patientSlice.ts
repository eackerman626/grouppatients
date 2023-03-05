import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getPatients, PatientData } from '../requests/patients';
import { ScheduleBlockData } from '../requests/schedule_blocks';
import { GroupData } from '../requests/groups';

interface PatientState {
	status: string;
	patients: PatientData[];
}

const initialState: PatientState = {
	status: 'idle',
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

export const fetchPatients = createAsyncThunk('fetchPatients', async () => {
	const response = await getPatients();
	return response;
});

const patientsSlice = createSlice({
	name: 'patients',
	initialState,
	reducers: {
		patientAdded(state: PatientState, action: PayloadAction<PatientData>) {
			const newPatient: PatientData = {
				id: action.payload.id,
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
	extraReducers: {
		[fetchPatients.pending.type]: (state, action) => {
			state.status = 'loading';
			state.patients = [];
		},
		[fetchPatients.fulfilled.type]: (state, action) => {
			state.status = 'idle';
			state.patients = action.payload;
		},
		[fetchPatients.rejected.type]: (state, action) => {
			state.status = 'error';
			state.patients = [];
		},
	},
});

export const { patientAdded, patientAvailabilityUpdated, patientGroupRemoved, patientGroupUpdated } = patientsSlice.actions;

export default patientsSlice.reducer;
