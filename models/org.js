module.exports = function(sequelize, Sequelize) {
	var model = sequelize.define("organization", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		url: {
			type: Sequelize.STRING,
			unique: true
		}
	});
	return model;
};