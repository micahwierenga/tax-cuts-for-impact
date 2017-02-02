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
	Pledge.findById(req.params.id)
		.then(function(user) {
			return user.updateAttributes(req.body);
		})
		.then(function(user) {
			res.json(user);
		});
};

function destroy (req, res) {
	Pledge.findById(req.params.id)
		.then(function(user) {
			return user.destroy();
		})
		.then(function() {
			res.redirect('/index');
		});
};

module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;