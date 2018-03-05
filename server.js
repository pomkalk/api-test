var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./server/models/user.models');
var Post = require('./server/models/post.model');
var route = require('./server/routes');
var cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/guest-book');

app.use(cors());
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

route(app);


app.listen(5000, ()=>console.log('Server started on 5000 port.'));
