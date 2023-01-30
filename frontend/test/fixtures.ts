export const scheduleBlocks = [
  {
    id: 1,
    day_of_week: 0,
    start_time: 800,
    end_time: 1200,
  },
  {
    id: 2,
    day_of_week: 1,
    start_time: 800,
    end_time: 1200,
  },
  {
    id: 3,
    day_of_week: 2,
    start_time: 1200,
    end_time: 1600,
  },
  {
    id: 4,
    day_of_week: 3,
    start_time: 1200,
    end_time: 1600,
  },
  {
    id: 5,
    day_of_week: 4,
    start_time: 1600,
    end_time: 2000,
  },
];

export const patientAvailability = scheduleBlocks.slice(0, 3);

export const daysOfWeek = ["M", "T", "W", "Th", "F"];

export const scheduleBlocksByDayOfWeek: {
  [key: typeof daysOfWeek[number]]: typeof scheduleBlocks[number];
} = scheduleBlocks.reduce((accum, block, index) => {
  return {
    ...accum,
    [daysOfWeek[block.day_of_week]]: block,
  };
}, {});
