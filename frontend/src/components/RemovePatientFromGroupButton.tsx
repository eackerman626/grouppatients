import { FC, FormEvent } from 'react';
import { removePatientFromGroup, PatientData } from '../requests/patients';

interface RemovePatientFromGroupProps {
	patient: PatientData;
	onRemovePatientFromGroup: (removedPatient: PatientData) => void;
}

const RemovePatientFromGroupButton: FC<RemovePatientFromGroupProps> = (props) => {
	const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		await removePatientFromGroup(props.patient.id);
		await props.onRemovePatientFromGroup(props.patient);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="submit" value="Remove" />
		</form>
	);
};

export default RemovePatientFromGroupButton;
