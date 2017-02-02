module.exports = function(sequelize, Sequelize) {
	var model = sequelize.define("organization", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		url: {
			type: Sequelize.STRING,
			unique: true
		},
		thumbnail: {
			type: Sequelize.STRING
		},
		threshold: {
			type: Sequelize.INTEGER
		}
	});
	return model;
};