module.exports = function(sequelize, Sequelize) {
	var model = sequelize.define("pledge", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		user_id: {
			type: Sequelize.STRING,
			allowNull: false
		},
		savings2016: {
			type: Sequelize.STRING
		},
		pledge2016: {
			type: Sequelize.STRING
		},
		org: {
			type: Sequelize.STRING
		}
	});
	return model;
};