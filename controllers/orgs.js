var db = require('../models');
var Pledge = db.models.Pledge;
var User = db.models.User;
var Organization = db.models.Organization;


function index (req, res) {
	Organization.findAll()
		.then(function(organization) {
			res.json(organization);
		});
};

function show (req, res) {
	Organization.findById(req.params.id)
		.then(function(organization) {
			res.json(organization);
		});
};

function create(req, res) {
	Organization.create(req.body)
	    .then(function(newOrganization) {
	    	res.json(newOrganization);
	    });
};

function update (req, res) {
	console.log("Here is the req.body" + req.params.id)
	Organization.findById(req.params.id)
		.then(function(organization) {
			return organization.updateAttributes(req.body);
		})
		.then(function(organization) {
			res.json(organization);
		});
};

function destroy (req, res) {
	Organization.findById(req.params.id)
		.then(function(organization) {
			return organization.destroy();
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