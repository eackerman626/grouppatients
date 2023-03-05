import { FC, FormEvent } from 'react';
import { useAppDispatch } from '../store';
import { patientGroupRemoved } from '../store/patientSlice';
import { removePatientFromGroup, PatientData } from '../requests/patients';

interface RemovePatientFromGroupProps {
	patient: PatientData;
	onRemovePatientFromGroup: (removedPatient: PatientData) => void;
}

const RemovePatientFromGroupButton: FC<RemovePatientFromGroupProps> = (props) => {
	const dispatch = useAppDispatch();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		await removePatientFromGroup(props.patient.id);
		props.onRemovePatientFromGroup(props.patient);
		dispatch(patientGroupRemoved({ patient: props.patient }));
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="submit" value="Remove" />
		</form>
	);
};

export default RemovePatientFromGroupButton;
