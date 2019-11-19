module.exports = function(app) {
    // require api-users.js (another router)
    require('./api-users.js')(app);

    // routes for '/' and '/dashboard' both load homepage
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

    // route for '/amazing'
    app.get('/amusing', (req,res) => {
        res.render("amuse", {
            loggedIn: false,
            isHome: false,
            route: 'amusing'
        });
    });

    // route for '/interesting'
    app.get('/interesting', (req,res) => {
        res.render("interest", {
            loggedIn: false,
            isHome: false,
            route: 'interesting'
        });
    });
};