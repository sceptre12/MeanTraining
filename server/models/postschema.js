var mongoose = require('mongoose');
 // Posts Schema
var postsSchema = mongoose.Schema({
	user: mongoose.Schema.Types.ObjectId,
	title: String,
	content: String
});

var posts = mongoose.model('posts', postsSchema);

module.exports = posts;