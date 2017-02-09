var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var cors = require('cors');
var taxRouter = require('./config/routes.js');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



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

app.use(taxRouter);

app.listen(process.env.PORT || 3001);
console.log('Listening on 3001');