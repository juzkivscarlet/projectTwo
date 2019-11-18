module.exports = function(app) {
    require('./api-users.js')(app);
    app.get("/", function(req,res) {
        res.render("index");
    });
};