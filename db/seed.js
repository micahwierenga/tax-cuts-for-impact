var DB = require("../models").models;

var userCreate = function() {
	return DB.User.create({
	    id: "1",
	    name: "Chad",
	    email: "chad@chad.com",
	    zip: "80123"
  	})
	.then(function(user) {
    	console.log(user);
	});
};

var pledgeCreate = function() {
	return DB.Pledge.create({
	    user_id: "1",
	    savings2016: "5000"
  	})
	.then(function(pledge) {
    	console.log(pledge);
	});
};

userCreate()
.then(pledgeCreate)
.then(function() {
	process.exit();
});

