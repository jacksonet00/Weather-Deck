import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Stack from '../components/Stack';
import WeatherCard from '../components/WeatherCard';

const App = () => {
	const [city, setCity] = useState('');
	const [cityList, setCityList] = useState([]);
	const [cityData, setCityData] = useState({});

	const refreshData = async () => {
		/*cityList.forEach((zip, i) => {
			fetch(
				`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${process.env.REACT_APP_API_KEY}`
			)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					let newData = { ...cityData };
					newData[zip] = data;
					setCityData(newData);
				});
		});*/
	};

	useEffect(() => {
		refreshData();
	}, [cityList]);

	const handleAddCity = (e) => {
		e.preventDefault();
		if (!cityList.includes(city) && validateZip(city)) {
			setCityList([...cityList, city]);
			setCity('');
		} else if (cityList.includes(city)) {
			setCity('');
		}
	};

	const validateZip = (zip) => {
		const pattern = /^\d{5}(?:[-\s]\d{4})?$/;
		return pattern.test(zip);
	};

	const renderCards = () => {
		return Object.entries(cityData).map((data, i) => {
			console.log(data);
			return <WeatherCard data={data[1]} key={i} />;
		});
	};

	return (
		<Stack vertical={true}>
			<Stack>
				<form onSubmit={handleAddCity}>
					<TextField
						value={city}
						onChange={(e) => setCity(e.target.value)}
						placeholder="Enter Zip Code"
						style={{ paddingRight: '1em' }}
					/>
					<Button variant="outlined" type="submit">
						Add
					</Button>
				</form>
			</Stack>
			<Stack>{renderCards()}</Stack>
		</Stack>
	);
};

export default App;
