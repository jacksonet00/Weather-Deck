import React from 'react';
import WeatherCard from './components/WeatherCard';

const cards = [32256];

function App() {
	return (
		<div className="dashboard">
			{cards.map((zip, i) => {
				return <WeatherCard zipCode={zip} key={i} />;
			})}
		</div>
	);
}

export default App;
