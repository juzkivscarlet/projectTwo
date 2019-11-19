// Require dependencies
var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
require('dotenv');

// Require all Models in ./models directory
var db = require('./models');

// Setup server w/ express
var app = express();
var PORT = process.env.PORT || 8000;

app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// app.use(validator());
app.use(cookieParser());
app.use(session({secret: 'doggo', saveUninitialized: false, resave: false}));
app.engine("handlebars", handlebars({
    defaultLayout:"main",
    layoutsDir: "./views/layouts/",
    partialsDir: "./views/partials/"
}));
app.set("view engine", "handlebars");

// Require router
require('./controllers/router.js')(app);

// Listener & sequelize
db.sequelize.sync({force:true}).then(function() {
    app.listen(PORT, function() {
        console.log("http://localhost:"+PORT);
    });
});