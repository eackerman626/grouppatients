import { ScheduleBlockData } from "./schedule_blocks";
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
  const response = await fetch("http://localhost:8000/patients");
  return await response.json();
};

export const postPatients = async (
  payload: PostPatientsPayload
): Promise<PatientData> => {
  const response = await fetch("http://localhost:8000/patients", {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
};

export const putPatientAvailabilty = async (
  patient_id: number,
  payload: number[]
): Promise<ScheduleBlockData[]> => {
  const response = await fetch(
    `http://localhost:8000/patients/${patient_id}/availabilities`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(payload),
    }
  );
  return await response.json();
};
