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
			type: Sequelize.STRING,
			unique: true
		},
		org: {
			type: Sequelize.STRING
		}
	});
	return model;
};