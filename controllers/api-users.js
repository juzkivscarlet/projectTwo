var db = require('../models');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {
	app.post("/signup", (req,res) => {
		console.log(req.body);
	});


};