var posts = require('../models/postschema'),
	express = require('express'),
	router = express.Router();

	//route for the getting the posts
	router.route('/todo')
		.get(function(req,res){
			posts.find(function(err, posts){
				if(err) return res.send(err);
				res.json(posts);
			});		
		})
		.post(function(req, res){
			var post = new posts(req.body);
			post.save(function(err){
				if(err) return res.send(err);
				res.send({message: "movie added"});
			});
		})

	module.exports = router;

