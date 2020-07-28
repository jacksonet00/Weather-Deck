import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
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

class WeatherCard extends Component {
	render() {
		return (
			<Card>
				<Title>{this.props.data.name}</Title>
				<Title color={'black'}>
					{this.kelvinToFahrenheit(this.props.data.main.temp)}°
				</Title>
			</Card>
		);
	}

	kelvinToFahrenheit = (temp) => {
		return Math.round(temp * 1.8 - 459.67);
	};
}

export default WeatherCard;
