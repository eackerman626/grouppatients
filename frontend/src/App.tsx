import { FC } from "react";
import PatientsList from "./components/PatientsList";

const App: FC = () => {
  return (
    <main>
      <PatientsList />
      <h1>Groups</h1>
    </main>
  );
};

export default App;
