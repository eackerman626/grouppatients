import { FC } from 'react';
import PatientsList from './components/PatientsList';
import GroupsList from './components/GroupsList';

const App: FC = () => {
	return (
		<main>
			<PatientsList />
			<GroupsList />
		</main>
	);
};

export default App;
