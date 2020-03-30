// app
const express = require('express');
const app = express();

// port
app.set('port', (process.env.port || 3000));

// cor
const cors = require('cors');
app.use(cors());

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));

// Apis
const api = require('./api/v1/index');
app.use(api);

// mongoose - settings ans start connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gmsusers', { userNewUrlParser: true});
const connection = mongoose.connection;
connection.on('error', (err) => {
	console.log(`Connection to mongoDB field ${err.message}`);
});
connection.once('open', () => {
	console.log('connected to MongoDB');
});

// If the http query is not found
app.use((req, result) =>  {
	const err = new Error('404 - Service not found !');
	err.status = 404;
	result.status(404).json(err);
});

// Start
app.listen(app.get('port'), () => {
	console.log(`Node server started at port ${app.get('port')}.`);
});
