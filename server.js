var express = require('express'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	methodOverride = require('method-override'),
	mongoose = require('mongoose'),
	app = express();

	// parses application json data
	app.use(bodyParser.json())

	// parse application x-www-form-urlencoded 
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	// override the x-http-method header in the request
	app.use(methodOverride('x-HTTP-Method-Override'));

	// Setting the static files locations
	app.use(express.static(__dirname + '/client'));

	// db connections
	mongoose.connect('mongodb://localhost/meantry');
	var db = mongoose.connection;
	// Output db errors to console
	db.on('error', console.error.bind(console, 'connection error: '));
	db.once('open', function(callback){
		console.log('connected to the db');
	});

	// getting all routes
	var mainRoute = require('./server/routes/mainRoute'),
		auth = require('./server/routes/auth'),
		posts = require('./server/routes/posts');

	// Adding routes into main application
	app.use('/', mainRoute);
	// auth route 
	app.use('/auth', auth);
	// post route
	app.use('/posts', posts);

	
	// Server Config 
	var port = process.env.PORT || 4200;
	app.listen(port);
	// Outputs the pot 
	console.log('This server is running live at http://localhost:' + port);
	// expose the application 

	module.exports = app;
