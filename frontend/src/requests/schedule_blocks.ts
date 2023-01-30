export interface ScheduleBlockData {
  id: number;
  day_of_week: number;
  start_time: number;
  end_time: number;
}

export const getScheduleBlocks = async (): Promise<ScheduleBlockData[]> => {
  const response = await fetch("http://localhost:8000/schedule_blocks");
  return await response.json();
};
