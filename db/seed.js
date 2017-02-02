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


var orgCreate = function() {
	return DB.Organization.bulkCreate([{
	    name: "Kiva",
	    url: "https://www.kiva.org/",
	    thumbnail: "/assets/kiva.png",
	    threshold: 1
  	},
  	{
	    name: "Village Capital",
	    url: "http://vilcap.com/",
	    thumbnail: "/assets/village_capital.png",
	    threshold: 1
  	},
  	{
	    name: "Unreasonable Institute",
	    url: "https://unreasonableinstitute.org/",
	    thumbnail: "/assets/unreasonable_institute.png",
	    threshold: 1
  	},
  	{
	    name: "Impact Charitable",
	    url: "http://www.impactcharitable.org/",
	    thumbnail: "/assets/impact_charitable.png",
	    threshold: 2
  	}])
	.then(function(org) {
    	console.log(org);
	});
};

var pledgeCreate = function() {
	return DB.Pledge.create({
	    user_id: "1",
	    savings2016: "5000",
	    org: "Kiva"
  	})
	.then(function(pledge) {
    	console.log(pledge);
	});
};

userCreate()
.then(orgCreate)
.then(pledgeCreate)
.then(function() {
	process.exit();
});

