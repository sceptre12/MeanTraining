var posts = require('../models/postschema'),
	express = require('express'),
	router = express.Router();

	//route for the getting the posts
	router.route('/posts/:userName')
		.get(function(req,res){
			console.log('Inside of Posts get ')
			console.log(req.params.userName)
			posts.find({user: req.params.userName}, function(err,post){
				console.log(post);
				if (err) res.send(err);
				res.json(post);
			});
		})
		.post(function(req, res){
			console.log('inside of Posts post')
			var post = new posts(req.body.posts);
			post.save(function(err){
				if(err) return res.send(err);
				res.send({posted: "success"});
			});
		})

	module.exports = router;
