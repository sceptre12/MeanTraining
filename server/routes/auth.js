var express = require('express'),
	users = require('../models/userschema'),
	router = express.Router();
// checking if user exists
router.route('/login')	
	.post(function(req,res){
		console.log('Inside of post request')
		var userData = req.body.login;
		console.log(userData);
		// searches for the user with this email
		users.findOne(
			{
				email: userData.email
			},
			function(err, email){
				if(err) {
					console.log('Error occured')
					return res.send(err); 
				}
				return res.send({data: email});
			}
		);
	});
 // registers user
 router.route('/register')
 	.post(function(req,res){
 		var user = new users(req.body.register);
 		console.log(user)
 		// saves the new user object in the db
 		user.save(function(err){
 			if(err) return res.send(err);
 			res.send({data: 'success'})
 		})
 	})

module.exports = router;