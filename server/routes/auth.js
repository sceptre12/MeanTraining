var express = require('express'),
	users = require('../models/userschema'),
	router = express.Router();

// checking if user exists
router.route('/login')
	.post(function(req,res){
		var uEmail = req.body.email;
		// searches for the user with this email
		user.findOne(
			{
				email: uEmail
			},
			function(err, post){
				if(err) return res.send(err);
				// logs the user in if they are found
				res.redirect(200, '/user');
			}
		);
	});
 // registers user
 router.route('/register')
 	.post(function(req,res){
 		var user = new users(req.body);
 		// saves the new user object in the db
 		user.save(function(err){
 			if(err) return res.send(err);
 			// redirects the url requests
 			res.redirect('/todo');
 		})
 	})

module.exports = router;