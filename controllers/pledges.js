var db = require('../models');
var Pledge = db.models.Pledge;
var User = db.models.User;

function index (req, res) {
	Pledge.findAll()
		.then(function(pledge) {
			console.log("Here's the pledge" + pledge)
			res.json(pledge);
		});
};

function show (req, res) {
	Pledge.findById(req.params.id)
		.then(function(user) {
			res.json(user);
		});
};

function create(req, res) {
	Pledge.create(req.body)
	    .then(function(newPledge) {
	    	res.json(newPledge);
	    });
};

function update (req, res) {
	console.log(req.body);
	Pledge.findById(req.params.id)
		.then(function(user) {
			console.log('This is the first then: ' + user);
			return user.updateAttributes(req.body);
		})
		.then(function(user) {
			console.log('This is the second then: ' + user)
			res.json(user);
		});
};

function destroy (req, res) {
	Pledge.findById(req.params.id)
		.then(function(pledge) {
			res.json(pledge);
			return pledge.destroy();
		})
		// .then(function() {
		// 	res.redirect('/');
		// });
};

module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;