var express = require('express');
var handlebars = require('express-handlebars');

var db = require('./models');

var app = express();
var PORT = process.env.PORT || 8000;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine("handlebars", handlebars({
    defaultLayout:"main",
    layoutsDir: "./views/layouts/",
    partialsDir: "./views/partials/"
}));
app.set("view engine", "handlebars");

require('./controllers/router.js')(app);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("http://localhost:"+PORT);
    });
});