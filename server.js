// Require dependencies
// express modules
var express = require('express');
var handlebars = require('express-handlebars');
var validator = require('express-validator');
var session = require('express-session');

// parser modules
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Require all Models, + passport & dotenv modules
var db = require('./models');
var passport = require('./config/passport');
require('dotenv');

// Setup server w/ express
var app = express();
var PORT = process.env.PORT || 8000;

// setup express
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// setup body-parser & cookie-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// app.use(validator());
app.use(cookieParser());

// setup express-session
app.use(session({secret: 'doggo', saveUninitialized: false, resave: false}));

// setup passport
app.use(passport.initialize());
app.use(passport.session());

// setup handlebars
app.engine("handlebars", handlebars({
    defaultLayout:"main",
    layoutsDir: "./views/layouts/",
    partialsDir: "./views/partials/",
    helpers: {
        is: function(a,b,opt) {
            if(a==b) return opt.fn(this);
            else return opt.inverse(this);
        },
        fontAwesome: `https://kit.fontawesome.com/${process.env.FONT_AWESOME}.js`
    }
}));
app.set("view engine", "handlebars");

// Require routers
require('./controllers/router.js')(app);
require('./controllers/api-users.js')(app);
require('./controllers/external-api.js')(app);

// Listener & sequelize
db.sequelize.sync({}).then(function() {
    app.listen(PORT, function() {
        console.log("http://localhost:"+PORT);
    });
});