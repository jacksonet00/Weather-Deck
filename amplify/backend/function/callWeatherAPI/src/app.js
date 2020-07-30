/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

var axios = require('axios');
var secret = require('./secret-manager');

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.post('/weather', async function (req, res) {
	const { zipCode } = req.body;
	const encodedZipCode = encodeURIComponent(zipCode);

	try {
		const secretObj = await secret();
		const { data } = await axios({
			method: 'GET',
			url: `http://api.openweathermap.org/data/2.5/weather?zip=${encodedZipCode}&appid=${secretObj['REACT-APP-API-KEY']}`,
			headers: {},
		});
		// fix: relevant data only
		const weatherData = data;
		return res.send(weatherData);
	} catch (e) {
		console.log(e);
		return res.status(500).send('Error.');
	}
});

app.listen(3000, function () {
	console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
