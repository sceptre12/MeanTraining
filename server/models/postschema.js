var mongoose = require('mongoose');
 // Posts Schema
var postsSchema = mongoose.Schema({
	user: String,
	title: String,
	content: String
});

var posts = mongoose.model('posts', postsSchema);

module.exports = posts;
