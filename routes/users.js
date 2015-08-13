var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	//A. When you're signed in, passport will auto include the user object to the request object
	var profileData  = req.user
	var profileName  = profileData.displayName
	var profileImage = profileData._json.image.url
	
	res.render('users', { 
		user: { 
			name:  profileName,
			image: profileImage
		} 
	});
});

module.exports = router;
