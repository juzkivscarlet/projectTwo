module.exports = function(app) {
	// require passport middleware
	require('../config/middleware/isAuthenticated');

	// if user not logged in: routes for '/' and '/dashboard' both load homepage
	// if user is logged in: routes for '/' and '/dashboard' both load /dashboard
	app.get("/", (req,res) => {
		if(req.user) {
			res.render("dashboard", {
				user: req.user,
				isHome: true,
				route: 'dashboard'
			});
		} else {
			res.render("index", {
				user: req.user,
				isHome: true,
				route: 'index'
			});
		}
	});

	app.get("/dashboard", (req,res) => {
		if(req.user) {
			res.render("dashboard", {
				user: req.user,
				isHome: true,
				route: 'dashboard'
			});
		} else {
			res.render("index", {
				user: req.user,
				isHome: true,
				route: 'index'
			});
		}
	});

	// route for /cheer
	app.get('/cheer', (req,res) => {
		res.render("cheer", {
			user: req.user,
			isHome: false,
			route: 'cheer'
		});
	});
};