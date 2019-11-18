// Require dependencies
var express = require('express');
var handlebars = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
require('dotenv');

// Require all Models in ./models directory
var db = require('./models');

// Setup server w/ express
var app = express();
var PORT = process.env.PORT || 8000;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(require('cookie-parser'));
// app.use(require('body-parser').urlencoded({extended:true}));
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
app.engine("handlebars", handlebars({
    defaultLayout:"main",
    layoutsDir: "./views/layouts/",
    partialsDir: "./views/partials/"
}));
app.set("view engine", "handlebars");

// Require router
require('./controllers/router.js')(app);

// Listener & sequelize
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("http://localhost:"+PORT);
    });
});