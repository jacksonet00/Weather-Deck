import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './routes/App';
import SignIn from './routes/SignIn';
import { AuthProvider } from './config/Auth';
import PrivateRoute from './routes/PrivateRoute';

const Root = () => {
	return (
		<AuthProvider>
			<Router>
				<PrivateRoute exact path="/" component={App} />
				<Route exact path="/login" component={SignIn} />
			</Router>
		</AuthProvider>
	);
};

export default Root;
