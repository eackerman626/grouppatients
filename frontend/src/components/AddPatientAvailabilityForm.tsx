import { ChangeEvent, FC, FormEvent, Fragment, useState } from "react";
import { PatientData, putPatientAvailabilty } from "../requests/patients";
import { ScheduleBlockData } from "../requests/schedule_blocks";

interface AddPatientAvailabilityFormProps {
  patient: PatientData;
  scheduleBlocks: ScheduleBlockData[];
  onAddPatientAvailability: (
    patient: PatientData,
    scheduleBlocks: ScheduleBlockData[]
  ) => void;
}

const days = ["M", "T", "W", "Th", "F"];

const AddPatientAvailabilityForm: FC<AddPatientAvailabilityFormProps> = ({
  scheduleBlocks = [],
  patient,
  onAddPatientAvailability,
}) => {
  const [selectedBlocks, setSelectedBlocks] = useState<{
    [key: string]: number | null;
  }>({});

  const blocksByDay = scheduleBlocks.reduce(
    (accum: { [key: string]: ScheduleBlockData[] }, block) => {
      const key = String(block.day_of_week);
      return {
        ...accum,
        [key]: accum[key] ? [...accum[key], block] : [block],
      };
    },
    {}
  );

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const scheduleBlockIds = Object.values(selectedBlocks).filter(
      (b): b is number => b !== null
    );
    if (scheduleBlockIds.length > 0) {
      const patientAvailablities = await putPatientAvailabilty(
        patient.id,
        scheduleBlockIds
      );
      onAddPatientAvailability(patient, patientAvailablities);
    }
  };

  const handleChange =
    (day: string) => (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedBlock = scheduleBlocks.find(
        (block) => String(block.id) === event.target.value
      );
      setSelectedBlocks({
        ...selectedBlocks,
        [day]: selectedBlock?.id ?? null,
      });
    };

  return (
    <span data-testid="availability-form">
      {patient.first_name} {patient.last_name}
      <form onSubmit={handleSubmit}>
        {Object.keys(blocksByDay).map((day) => {
          const dayCode = days[parseInt(day)];
          return (
            <Fragment key={day}>
              <label htmlFor={dayCode}>{dayCode}</label>
              <select name={dayCode} id={dayCode} onChange={handleChange(day)}>
                <option value="" />
                {blocksByDay[day].map((block) => (
                  <option value={block.id} key={block.id}>
                    {block.start_time} - {block.end_time}
                  </option>
                ))}
              </select>
            </Fragment>
          );
        })}
        <input type="submit" value="Set Availability" />
      </form>
    </span>
  );
};

export default AddPatientAvailabilityForm;
