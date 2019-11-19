module.exports = function(app) {
    require('./api-users.js')(app);

    
    app.get("/", (req,res) => {
        res.render("index", {
            loggedIn: false,
            isHome: true,
            route: 'index'
        });
    });

    app.get("/dashboard", (req,res) => {
        res.render("index", {
            loggedIn: false,
            isHome: true,
            route: 'index'
        });
    });

    app.get('/amusing', (req,res) => {
        res.render("amuse", {
            loggedIn: false,
            isHome: false,
            route: 'amusing'
        });
    });

    app.get('/interesting', (req,res) => {
        res.render("interest", {
            loggedIn: false,
            isHome: false,
            route: 'interesting'
        });
    });
};