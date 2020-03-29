// app
const express = require('express');
const app = express();

// port
app.set('port', (process.env.port || 3000));

// cor
const cors = require('cors');
app.use(cors());

// Apis
const api = require('./api/v1/index');
app.use(api);

// If the http query is not found
app.use((req, result) =>  {
	const err = new Error('404 - Service not found !');
	err.status = 404;
	result.status(404).json(err);
});

// Start
app.listen(app.get('port'), () => {
	console.log(`Node server started at port ${app.get('port')}`);
});
