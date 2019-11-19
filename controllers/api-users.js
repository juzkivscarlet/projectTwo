var db = require('../models');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {
	app.post("/signup", async(req,res) => {
		console.log(req.body);

		try {
			var password = await bcrypt.hash(req.body.password,10);
			db.Users.create({
				name: req.body.name,
				username: req.body.username,
				email: req.body.email,
				password_hash: password
			}).then((newUser) => {
				res.json(newUser);
			});
		} catch {
			res.redirect("/");
		}
	});
};