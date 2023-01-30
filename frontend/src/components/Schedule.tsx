import { FC } from "react";

export interface ScheduleBlock {
  day_of_week: number;
  start_time: number;
  end_time: number;
}

interface ScheduleProps {
  schedule: ScheduleBlock[];
}

const daysOfWeek = ["M", "T", "W", "Th", "F"];

const Schedule: FC<ScheduleProps> = ({ schedule }) => {
  return (
    <span data-testid="schedule">
      {schedule.map(({ day_of_week, start_time, end_time }, index) => (
        <span key={index}>
          {index > 0 && " | "}
          {daysOfWeek[day_of_week]}: {start_time} - {end_time}
        </span>
      ))}{" "}
    </span>
  );
};

export default Schedule;
