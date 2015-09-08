var express = require('express'),
	router = express.Router();




// handles request coming in for all angular js routes
router.get('/*', function(req,res){
	res.sendfile('./client/views/index.html');
});


module.exports = router;
