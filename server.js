var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');

app.use(cors());

var authCheck = jwt({
	secret: new Buffer('HMfc2B_6fea0tqNyojzXKKNYCMfTQkSSai_EJTq811WDl82gFe-qTPdzHAA0-8TX'),
	audience: 'cl7FNIVPdTJUKFNHGoGkizy7o7XX40pH'
});

app.get('/api/public', function(req, res) {
	res.json({ message: "Hello from a public endpoint! "});
});

app.get('/api/private', authCheck, function(req, res) {
	res.json({ message: "Hello from a private endpoint! "});
});

app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/', express.static(__dirname + '/public'));

app.listen(3001);
console.log('Listening on 3001');