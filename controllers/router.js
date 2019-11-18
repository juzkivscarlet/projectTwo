module.exports = function(app) {
    require('./api-users.js')(app);

    
    app.get("/", (req,res) => {
        res.render("index");
    });

    app.get("/dashboard", (req,res) => {
        res.render("index");
    });
};