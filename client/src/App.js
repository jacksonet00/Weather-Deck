import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import WeatherCard from './components/WeatherCard';
import { API } from 'aws-amplify';

const Stack = styled.div`
	display: flex;
	padding: 1em;

	${(props) =>
		css`
			flex-direction: ${props.vertical ? 'column' : 'row'};
		`};
`;

const Button = styled.button`
	color: black;
`;

const Title = styled.h1`
	${(props) =>
		css`
			color: ${props.color ? props.color : 'palevioletred'};
		`};
`;

class App extends Component {
	state = {
		cities: {},
	};

	componentDidMount() {
		this.updateAll();
	}

	render() {
		return (
			<Stack vertical={true}>
				<Stack>
					<input
						type="text"
						id="zip-code-input"
						placeholder="Enter Zip Code"
						onKeyPress={this.enterPressed.bind(this)}
					/>
					<Button
						id="add-btn"
						onClick={() =>
							this.add(
								document.getElementById(
									'zip-code-input'
								).value
							)
						}
					>
						{' '}
						Add{' '}
					</Button>
					<Button onClick={() => this.updateAll()}>
						{' '}
						Refresh{' '}
					</Button>
					<Title></Title>
				</Stack>
				<Stack>
					{Object.keys(this.state.cities).map((key) => {
						return (
							<WeatherCard
								data={this.state.cities[key]}
								key={key}
							/>
						);
					})}
				</Stack>
			</Stack>
		);
	}

	add = async (zip) => {
		if (this.validateZip(zip)) {
			this.updateCityData(zip);
			document.getElementById('zip-code-input').value = '';
		}
	};

	updateCityData = (zipCode) => {
		const myInit = {
			body: {
				zipCode: zipCode,
			},
		};

		API.post('weatherAPI', '/weather', myInit)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				console.log(res);
				let cities = this.state.cities;
				cities[zip] = res;
				this.setState({ cities }, () => {
					localStorage.setItem(
						'weather-deck-cities',
						JSON.stringify(this.state.cities)
					);
				});
			})
			.catch((e) => {
				console.log(e);
			})
			.finally(() => {
				console.log('fetched data');
			});
	};

	updateAll = async () => {
		Object.keys(this.state.cities).forEach((zip) => {
			this.updateCityData(zip);
		});
	};

	validateZip = (zip) => {
		const pattern = /^\d{5}(?:[-\s]\d{4})?$/;
		return pattern.test(zip);
	};

	enterPressed = (event) => {
		var code = event.keyCode || event.which;
		if (code === 13) {
			document.getElementById('add-btn').click();
		}
	};
}

export default App;
