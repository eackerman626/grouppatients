import PatientsList from "./PatientsList";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import server from "../../test/mockServer";
import { scheduleBlocksByDayOfWeek } from "../../test/fixtures";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Patients List", () => {
  it("displays a patients with their availability when it exists", async () => {
    render(<PatientsList />);

    await waitFor(() => {
      screen.getAllByTestId("patient");
    });

    expect(screen.getAllByTestId("patient")[0]).toHaveTextContent(
      "Carol Danvers: M: 800 - 1200 | T: 800 - 1200 | W: 1200 - 1600"
    );
  });

  it("displays a patients without availability", async () => {
    render(<PatientsList />);

    await waitFor(() => {
      screen.getByTestId("availability-form");
    });

    expect(screen.getByTestId("availability-form")).toHaveTextContent(
      "Natasha Romanoff"
    );
  });

  describe("Adding patients", () => {
    it("adds a patient to the list when submitted", async () => {
      const user = userEvent.setup();
      render(<PatientsList />);

      await waitFor(() => {
        screen.getAllByTestId("patient");
      });

      await user.type(screen.getByLabelText("First Name:"), "Wanda");
      await user.type(screen.getByLabelText("Last Name:"), "Maximoff");
      await user.click(screen.getByDisplayValue("Add Patient"));

      const newPatient = await screen.findByText("Wanda Maximoff");

      expect(newPatient).toBeInTheDocument();
    });
  });

  describe("Adding patient availability", () => {
    it("updates a patients availability when submitted", async () => {
      const user = userEvent.setup();
      render(<PatientsList />);

      const days = Object.keys(scheduleBlocksByDayOfWeek).slice(-3);
      const blockIds = Object.values(scheduleBlocksByDayOfWeek)
        .map(({ id }) => id)
        .slice(-3);

      await waitFor(() => {
        // wait for for the schedule block selects for each day to be visible
        screen.getByLabelText(days[0]);
      });

      await user.selectOptions(
        screen.getByLabelText(days[0]),
        String(blockIds[0])
      );
      await user.selectOptions(
        screen.getByLabelText(days[1]),
        String(blockIds[1])
      );
      await user.selectOptions(
        screen.getByLabelText(days[2]),
        String(blockIds[2])
      );
      await user.click(screen.getByDisplayValue("Set Availability"));

      await waitFor(() => {
        expect(screen.getAllByTestId("patient")).toHaveLength(2);
      });

      const updatedPatient = screen.getAllByTestId("patient")[1];

      expect(updatedPatient).toHaveTextContent(
        "Natasha Romanoff: W: 1200 - 1600 | Th: 1200 - 1600 | F: 1600 - 2000"
      );
    });
  });
});
