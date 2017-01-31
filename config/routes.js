var express = require('express');
var router = express.Router();
var userController = require('../controllers/users.js');
var orgController = require('../controllers/orgs.js');
// var auth = require('../resources/auth.js');

// User Routes

router.route('/api/user')
	.post(userController.create)

router.route('/api/me')
	.get(auth.ensureAuthenticated, userController.show)
	.put(auth.ensureAuthenticated, userController.update)

// Auth Routes

router.route('/auth/signup')
	.post(userController.signup)

router.route('/auth/login')
	.post(userController.login)

// Organization Routes

router.route('/api/orgs')
	.get(orgController.index)
	.post(auth.ensureAuthenticated, orgController.create)

module.exports = router;