import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import keys from '../config/secret';

const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	align-items: center;
	border-radius: 2em;
	width: 15em;
	height: 20em;
	margin: 1em;

	${(props) =>
		css`
			background-color: ${props.color ? props.color : 'papayawhip'};
		`};
`;

const Title = styled.h1`
	${(props) =>
		css`
			color: ${props.color ? props.color : 'palevioletred'};
		`};
`;

const WeatherCard = ({ zip }) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});

	const fetchData = async () => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${keys.wApiKey}`
		)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLoading(false);
			});
		/*setData({
			name: 'test',
			main: {
				temp: '999',
			},
		});
		setLoading(false);*/
	};

	useEffect(() => {
		fetchData();
	}, []);

	const kelvinToFahrenheit = (temp) => {
		return Math.round(temp * 1.8 - 459.67);
	};

	return !loading ? (
		<Card>
			<Title>{data.name}</Title>
			<Title color={'black'}>
				{kelvinToFahrenheit(data.main.temp)}°
			</Title>
		</Card>
	) : (
		<></>
	);
};

export default WeatherCard;
