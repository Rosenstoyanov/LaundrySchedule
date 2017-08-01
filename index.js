global.__base = __dirname + '/';
var express = require('express');
var bodyParser = require('body-parser');
var appRoutes = require('./app/routes/router');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', appRoutes);

app.listen(3000, function() {
    console.log('Server listening on 3000');
});
