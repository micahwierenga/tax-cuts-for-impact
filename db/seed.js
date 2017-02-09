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
	    thumbnail: "/assets/kiva.jpg",
	    threshold: 1,
	    description: "Banjo gentrify tacos cliche, unicorn waistcoat shoreditch williamsburg celiac coloring book neutra la croix. Waistcoat copper mug 90's, brunch pok pok pork belly occupy pinterest. Chia tilde ennui, salvia farm-to-table shoreditch actually.",
	    totalDonations: 8587
  	},
  	{
	    name: "Village Capital",
	    url: "http://vilcap.com/",
	    thumbnail: "/assets/village_capital.png",
	    threshold: 1,
	    description: "Banjo gentrify tacos cliche, unicorn waistcoat shoreditch williamsburg celiac coloring book neutra la croix. Waistcoat copper mug 90's, brunch pok pok pork belly occupy pinterest. Chia tilde ennui, salvia farm-to-table shoreditch actually.",
	    totalDonations: 7154
  	},
  	{
	    name: "Unreasonable Institute",
	    url: "https://unreasonableinstitute.org/",
	    thumbnail: "/assets/unreasonable_institute.png",
	    threshold: 1,
	    description: "Banjo gentrify tacos cliche, unicorn waistcoat shoreditch williamsburg celiac coloring book neutra la croix. Waistcoat copper mug 90's, brunch pok pok pork belly occupy pinterest. Chia tilde ennui, salvia farm-to-table shoreditch actually.",
	    totalDonations: 10640
  	},
  	{
	    name: "Impact Charitable",
	    url: "http://www.impactcharitable.org/for-donors/",
	    thumbnail: "/assets/impact_charitable.png",
	    threshold: 2,
	    description: "Banjo gentrify tacos cliche, unicorn waistcoat shoreditch williamsburg celiac coloring book neutra la croix. Waistcoat copper mug 90's, brunch pok pok pork belly occupy pinterest. Chia tilde ennui, salvia farm-to-table shoreditch actually.",
	    totalDonations: 9366
  	}])
	.then(function(org) {
    	console.log(org);
	});
};

var pledgeCreate = function() {
	return DB.Pledge.bulkCreate([{
	    user_id: "1",
	    savings2016: "$5000",
	    pledge2016: "$4000",
	    org: "Kiva"
  	},
  	{
	    user_id: "2",
	    savings2016: "$1000",
	    pledge2016: "$1000",
	    org: "Unreasonable Institute"
  	},
  	{
	    user_id: "3",
	    savings2016: "$3000",
	    pledge2016: "$2000",
	    org: "Impact Charitable"
  	},
  	{
	    user_id: "4",
	    savings2016: "$4000",
	    pledge2016: "$4000",
	    org: "Village Capital"
  	}])
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

