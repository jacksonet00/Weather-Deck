import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './routes/App';
import SignIn from './routes/SignIn';
import { AuthProvider } from './config/Auth';
import PrivateRoute from './routes/PrivateRoute';
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import firebase from 'firebase';
import config from './config/firebase';
import SignUp from './routes/SignUp';
import ForgotPassword from './routes/ForgotPassword';

const Root = () => {
	return (
		<AuthProvider>
			<FirebaseDatabaseProvider firebase={firebase} {...config}>
				<Router>
					<PrivateRoute exact path="/" component={App} />
					<Route
						exact
						path="/forgot-password"
						component={ForgotPassword}
					/>
					<Route exact path="/login" component={SignIn} />
					<Route exact path="/signup" component={SignUp} />
				</Router>
			</FirebaseDatabaseProvider>
		</AuthProvider>
	);
};

export default Root;
