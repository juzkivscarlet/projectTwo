// Require dependencies

// Import Models folder
var db = require('../models');

// Import node.js modules
var bcrypt = require('bcryptjs');
var passport = require('../config/passport.js');
require('dotenv').config();

module.exports = function(app) {

	// POST request for login
	app.post("/login", passport.authenticate("local"), (req,res) => {
		res.json(req.user);
	});

	// POST request for /signup
	app.post("/signup", async(req,res) => {
		console.log(req.body);

		// SQL: insert into Users (name,username,email,password_hash)...
		db.Users.create({
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		}).then(() => {
			res.redirect(307, "/login");
		}).catch((err) => {
			res.status(401).json(err);
		});
	});

	// GET request for logout
	app.get("/logout", (req,res) => {
		res.logout();
		res.redirect("/");
	});

	// Route for user data
	app.get("/api/user_data", (req,res) => {
		if(!req.user) res.json({});
		else {
			res.json({
				name: req.user.name,
				username: req.user.username,
				id: req.user.id
			});
		}
	});
};