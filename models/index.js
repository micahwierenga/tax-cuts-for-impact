var Seqeulize = require('Seqeulize');

var sequelize = new Seqeulize(process.env.DATABASE_URL || process.env.LOCAL_DB);

module.exports.Seqeulize = Seqeulize;
module.exports.sequelize = sequelize;

var User = sequelize.import('./user');
var Organization = sequelize.import('./org');

module.exports.models = {
	User: User,
	Organization: Organization
}