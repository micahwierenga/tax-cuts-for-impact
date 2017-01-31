module.exports = function(sequelize, Sequelize) {
	var model = sequelize.define("user", {
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: true // Needs to change once I can add name to the signin form
		},
		zip: {
			type: Sequelize.STRING,
			allowNull: true // Needs to change once I can add zip to the signin form
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			isEmail: true
		}
		// password: Sequelize.STRING,
		// googleId: {
		// 	type: Sequelize.STRING,
		// 	unique: true
		// },
		// facebookId: {
		// 	type: Sequelize.STRING,
		// 	unique: true
		// },
		// twitterId: {
		// 	type: Sequelize.STRING,
		// 	unique: true
		// },
		// linkedinId: {
		// 	type: Sequelize.STRING,
		// 	unique: true
		// }
	});
	return model;
};