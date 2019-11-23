// Require dependencies

// Import Models folder
var db = require('../models');

// Import node.js modules
var bcrypt = require('bcryptjs');
var passport = require('../config/passport.js');
var calendar = require('../config/google');
require('dotenv').config();

module.exports = function(app) {

	// POST request for login
	app.post("/login", passport.authenticate("local"), (req,res) => {
		req.login(req.user, (err) => {
			if(err) return console.log(err);
			res.json(req.user);
		});
	});

	// POST request for /signup
	app.post("/signup", async(req,res) => {

		// SQL: insert into Users (name,username,email,password)...
		db.Users.create({
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		}).then(() => {
			// redirect to / (homepage)
			res.redirect(307, "/login");
		}).catch((err) => {
			// if error
			res.status(401).json(err);
		});
	});

	// GET request for logout
	app.get("/logout", (req,res) => {
		req.logout();
		// redirect to homepage
		res.redirect("/");
	});

	// Route for user data
	app.get("/api/user_data", (req,res) => {
		// if user isn't logged in, return empty JSON object
		if(!req.user) res.json({});
		else {
			// if user is logged in, return JSON: {name, username, id}
			res.json({
				name: req.user.name,
				username: req.user.username,
				id: req.user.id
			});
		}
	});

	app.get('/google/calendar', (req,res) => {
		// calendar.run();
	});
};