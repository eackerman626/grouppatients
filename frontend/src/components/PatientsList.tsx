import { FC, useEffect, useState } from "react";
import AddPatientForm from "./AddPatientForm";
import Patient from "./Patient";
import { getPatients, PatientData } from "../requests/patients";
import {
  getScheduleBlocks,
  ScheduleBlockData,
} from "../requests/schedule_blocks";
import AddPatientAvailabilityForm from "./AddPatientAvailabilityForm";

const PatientsList: FC = () => {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [scheduleBlocks, setScheduleBlocks] = useState<ScheduleBlockData[]>([]);

  useEffect(() => {
    (async () => {
      setPatients(await getPatients());
      setScheduleBlocks(await getScheduleBlocks());
    })();
  }, []);

  const handleAddPatient = (patient: PatientData): void => {
    setPatients([...patients, patient]);
  };

  const handleAddPatientAvailability = (
    updatedPatient: PatientData,
    scheduleBlocks: ScheduleBlockData[]
  ): void => {
    setPatients(
      patients.map((patient) =>
        patient.id === updatedPatient.id
          ? { ...updatedPatient, availabilities: scheduleBlocks }
          : patient
      )
    );
  };

  return (
    <div>
      <h1>Patients</h1>
      <ul>
        {patients.map((patient) => {
          return (
            <li key={patient.id}>
              {patient.availabilities.length > 0 ? (
                <Patient patient={patient} />
              ) : (
                <AddPatientAvailabilityForm
                  patient={patient}
                  scheduleBlocks={scheduleBlocks}
                  onAddPatientAvailability={handleAddPatientAvailability}
                />
              )}
            </li>
          );
        })}
      </ul>
      <AddPatientForm onAddPatient={handleAddPatient} />
    </div>
  );
};

export default PatientsList;