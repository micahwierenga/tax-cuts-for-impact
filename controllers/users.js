var db = require('../models');
var User = db.models.User;
var Org = db.models.Org;

function show (req, res) {
	User.findById(req.params.id)
		.then(function(user) {
			res.json(user);
		});
};

function create (req, res) {
	console.log(req.body);
	User.create(req.body).
		.then(function(user) {
			res.json(user);
		})
}

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

function signup(req, res) {
	User.create(req.body) {
		.then(function(user) {
			if (!user) return error(res, 'not saved');
			auth.createJWT(user);
			res.send({
				token: auth.createJWT(user),
				user: user
			});
		});
	};