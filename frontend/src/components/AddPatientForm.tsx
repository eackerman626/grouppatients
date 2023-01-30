import { ChangeEvent, FC, FormEvent, useState } from "react";
import { postPatients, PatientData } from "../requests/patients";

interface AddPatientFormProps {
  onAddPatient: (patient: PatientData) => void;
}

const AddPatientForm: FC<AddPatientFormProps> = ({ onAddPatient }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const result = await postPatients({
      first_name: firstName,
      last_name: lastName,
    });
    onAddPatient(result);

    setFirstName("");
    setLastName("");
  };

  return (
    <div>
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFirstName(event.target.value)
            }
          />
        </label>
        &nbsp;
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setLastName(event.target.value)
            }
          />
        </label>
        &nbsp;
        <input type="submit" value="Add Patient" />
      </form>
    </div>
  );
};

export default AddPatientForm;
