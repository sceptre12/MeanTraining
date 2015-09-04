var mongoose = require('mongoose');
// User Schema
var userSchema = mongoose.Schema({
	username: String,
	name: String,
	email: String,
	password: String
});

var users = mongoose.model('users', userSchema);

module.exports = users;