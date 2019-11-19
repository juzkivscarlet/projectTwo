// Require dependencies

// Import Models folder
var db = require('../models');

// Import node.js modules
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('dotenv');

module.exports = function(app) {

	// POST request for /signup
	app.post("/signup", async(req,res) => {
		console.log(req.body);

		try {
			// encrypt password
			var password = await bcrypt.hash(req.body.password, process.env.BCRYPT_SALT);

			// SQL: insert into Users (name,username,email,password_hash)...
			db.Users.create({
				name: req.body.name,
				username: req.body.username,
				email: req.body.email,
				password_hash: password
			}).then((newUser) => {
				res.json(newUser);
			});
		} catch {
			// If error, reload homepage
			res.redirect("/");
		}
	});
};