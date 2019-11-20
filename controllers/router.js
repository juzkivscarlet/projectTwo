module.exports = function(app) {
    // require api-users.js (another router)
    require('../config/middleware/isAuthenticated.js');

    // routes for '/' and '/dashboard' both load homepage
    app.get("/", (req,res) => {
        res.render("index", {
            user: req.user,
            isHome: true,
            route: 'index'
        });
    });

    app.get("/dashboard", (req,res) => {
        res.render("index", {
            user: req.user,
            isHome: true,
            route: 'index'
        });
    });

    // route for '/amazing'
    app.get('/amusing', (req,res) => {
        res.render("amuse", {
            user: req.user,
            isHome: false,
            route: 'amusing'
        });
    });

    // route for '/interesting'
    app.get('/interesting', (req,res) => {
        res.render("interest", {
            user: req.user,
            isHome: false,
            route: 'interesting'
        });
    });
};