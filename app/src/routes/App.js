import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Stack from '../components/Stack';
import WeatherCard from '../components/WeatherCard';
import {
	FirebaseDatabaseMutation,
	FirebaseDatabaseNode,
} from '@react-firebase/database';
import app from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import '../styles/app.css';

const AppDataLayer = () => {
	const stringifyEmail = (email) => {
		let chars = email.split('');
		chars = chars.filter((char) => char !== '@' && char !== '.');
		return chars.join('');
	};

	return (
		<FirebaseDatabaseNode
			path={`users/${stringifyEmail(app.auth().currentUser.email)}`}
		>
			{(data) => {
				return (
					<FirebaseDatabaseMutation
						type="set"
						path={`users/${stringifyEmail(
							app.auth().currentUser.email
						)}/${uuidv4()}`}
					>
						{({ runMutation }) => {
							return (
								<App
									data={data.value}
									key={data.value}
									onAdd={(city) => runMutation(city)}
								/>
							);
						}}
					</FirebaseDatabaseMutation>
				);
			}}
		</FirebaseDatabaseNode>
	);
};

const App = (props) => {
	const cityList = props.data
		? Object.entries(props.data).map((arr) => arr[1])
		: [];

	const [city, setCity] = useState('');

	const handleAddCity = (e) => {
		e.preventDefault();
		if (!cityList.includes(city) && validateZip(city)) {
			props.onAdd(city);
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
		return cityList.map((zip, i) => {
			return zip !== '-1' ? (
				<WeatherCard zip={zip} key={i} />
			) : (
				<React.Fragment key={i}></React.Fragment>
			);
		});
	};

	return (
		<Stack vertical={true}>
			<Stack>
				<form
					onSubmit={handleAddCity}
					style={{ paddingRight: '1em' }}
				>
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
				<Button
					variant="outlined"
					onClick={() => app.auth().signOut()}
				>
					Sign Out
				</Button>
			</Stack>
			<div className="card-grid">{renderCards()}</div>
		</Stack>
	);
};

export default AppDataLayer;
