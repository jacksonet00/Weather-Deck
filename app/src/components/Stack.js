import styled, { css } from 'styled-components';

const Stack = styled.div`
	display: flex;

	${(props) =>
		css`
			flex-direction: ${props.vertical ? 'column' : 'row'};
			padding: ${props.noPadding ? '0' : '1em'};
		`};
`;

export default Stack;
