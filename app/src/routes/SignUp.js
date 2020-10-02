import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import app from '../config/firebase';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
	FirebaseDatabaseMutation,
	FirebaseDatabaseNode,
} from '@react-firebase/database';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Copyright = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://jacksontaylor.info">
				Weather Deck
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

const SignUpMutationLayer = ({ history }) => {
	const stringifyEmail = (email) => {
		let chars = email.split('');
		chars = chars.filter((char) => char !== '@' && char !== '.');
		return chars.join('');
	};

	return (
		<FirebaseDatabaseMutation path="users" type="set">
			{({ runMutation }) => {
				return (
					<FirebaseDatabaseNode path="users">
						{(data) => {
							return (
								<SignUp
									history={history}
									onInit={(email) =>
										runMutation({
											...data.value,
											[stringifyEmail(
												email
											)]: { empty: '-1' },
										})
									}
								/>
							);
						}}
					</FirebaseDatabaseNode>
				);
			}}
		</FirebaseDatabaseMutation>
	);
};

const SignUp = ({ history, onInit }) => {
	const handleSignUp = useCallback(
		async (event) => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await app
					.auth()
					.createUserWithEmailAndPassword(
						email.value,
						password.value
					);
				app.auth().signInWithEmailAndPassword(
					email.value,
					password.value
				);
				onInit(app.auth().currentUser.email);
				history.push('/');
			} catch (error) {
				alert(error);
			}
		},
		[history, onInit]
	);

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
				<form className={classes.form} onSubmit={handleSignUp}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default withRouter(SignUpMutationLayer);
