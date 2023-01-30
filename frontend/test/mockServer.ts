import { rest } from "msw";
import { setupServer } from "msw/node";
import { scheduleBlocks, patientAvailability } from "./fixtures";

const server = setupServer(
  rest.get("http://localhost:8000/patients", (_req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          first_name: "Carol",
          last_name: "Danvers",
          availabilities: patientAvailability,
        },
        {
          id: 2,
          first_name: "Natasha",
          last_name: "Romanoff",
          availabilities: [],
        },
      ])
    );
  }),
  rest.get("http://localhost:8000/schedule_blocks", (_req, res, ctx) => {
    return res(ctx.json(scheduleBlocks));
  }),
  rest.post("http://localhost:8000/patients", async (req, res, ctx) => {
    const patientData = await req.json();
    return res(
      ctx.json({
        id: String(Math.floor(Math.random() * 100)),
        availabilities: [],
        ...patientData,
      })
    );
  }),
  rest.put(
    "http://localhost:8000/patients/:patient_id/availabilities",
    async (req, res, ctx) => {
      const scheduleBlockIds: number[] = await req.json();
      const selectedBlocks = scheduleBlockIds.map((id) =>
        scheduleBlocks.find((block) => block.id === id)
      );
      return res(ctx.json(selectedBlocks));
    }
  )
);

export default server;
