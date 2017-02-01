var db = require('../models');
var Pledge = db.models.Pledge;
var User = db.models.User;


function show (req, res) {
	Pledge.findById(req.params.id)
		.then(function(user) {
			res.json(user);
		});
};

function create(req, res) {
	console.log('Yippee create pledges');
	console.log(req.body);
	Pledge.create(req.body)
	    .then(function(newPledge) {
	    	console.log(newPledge);
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

module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;