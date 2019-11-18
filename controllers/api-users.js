var db = require('../models');

module.exports = function(app) {
    app.get("/signup", function(req,res) {
        console.log(req.body);
    });
};