var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var userController = require('../controllers/users.js');
var pledgeController = require('../controllers/pledges.js');
var orgController = require('../controllers/orgs.js');
// var auth = require('../resources/auth.js');

var authCheck = jwt({
	secret: new Buffer('HMfc2B_6fea0tqNyojzXKKNYCMfTQkSSai_EJTq811WDl82gFe-qTPdzHAA0-8TX'),
	audience: 'cl7FNIVPdTJUKFNHGoGkizy7o7XX40pH'
});

// User Routes

router.post('/api/user', userController.create);

// Pledge Routes

router.get('/api/pledge', pledgeController.index);

router.post('/api/pledge', authCheck, pledgeController.create);

// Organization Routes

router.get('/api/orgs', orgController.index);


module.exports = router;