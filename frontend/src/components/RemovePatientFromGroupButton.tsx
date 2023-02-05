import { FC, FormEvent } from 'react';
import { removePatientFromGroup, PatientData } from '../requests/patients';

interface RemovePatientFromGroupProps {
	patient: PatientData;
	onRemovePatientFromGroup: (patient: PatientData) => void;
}

const RemovePatientFromGroupButton: FC<RemovePatientFromGroupProps> = ({ patient, onRemovePatientFromGroup }) => {
	const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		await removePatientFromGroup(patient.id);
		await onRemovePatientFromGroup(patient);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="submit" value="Remove" />
		</form>
	);
};

export default RemovePatientFromGroupButton;
