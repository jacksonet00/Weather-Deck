import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import WeatherCard from './components/WeatherCard';
import secretKeys from './secret';

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

	url = 'http://api.openweathermap.org/data/2.5/weather?';

	render() {
		return (
			<Stack vertical={true}>
				<Stack>
					<Button> Add </Button>
					<Button onClick={() => this.update('32256')}>
						{' '}
						Refresh{' '}
					</Button>
					<Title color={'red'}> Weather Deck </Title>
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

	update = async (zip) => {
		fetch(`${this.url}zip=${zip}&appid=${secretKeys.api_key}`)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				console.log(res);
				this.setState({ cities: { zip: res } });
			});
	};
}

export default App;
