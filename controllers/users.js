var db = require('../models');
var User = db.models.User;
var Org = db.models.Org;

function show (req, res) {
	User.findById(req.params.id)
		.then(function(user) {
			res.json(user);
		});
};

function create(req, res) {
	User.create(req.body)
	    .then(function(newUser) {
	    	res.json(newUser);
	    });
};

function update (req, res) {
	User.findById(req.params.id)
		.then(function(user) {
			return user.updateAttributes(req.body);
		})
		.then(function(user) {
			res.json(user);
		});
};

function destroy (req, res) {
	User.findById(req.params.id)
		.then(function(user) {
			return user.destroy();
		})
		.then(function() {
			res.redirect('/index');
		});
};

module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;