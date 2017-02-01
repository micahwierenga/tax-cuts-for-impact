var Seqeulize = require('sequelize');


var sequelize = new Seqeulize(process.env.DATABASE_URL || 'postgres://micahwierenga@localhost:5432/tax_cuts_for_impact');

module.exports.Seqeulize = Seqeulize;
module.exports.sequelize = sequelize;

var User = sequelize.import('./user');
var Organization = sequelize.import('./org');
var Pledge = sequelize.import('./pledge');

module.exports.models = {
	User: User,
	Organization: Organization,
	Pledge: Pledge
}