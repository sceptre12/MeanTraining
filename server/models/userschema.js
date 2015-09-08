var mongoose = require('mongoose');
// User Schema
var userSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
	signedOn: Boolean
});

var users = mongoose.model('users', userSchema);

module.exports = users;
