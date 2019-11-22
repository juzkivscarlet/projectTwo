const axios = require('axios');
const request = require('request');
const fetch = require('node-fetch');
const reverse = require('reverse-geocode');
require('dotenv').config();

module.exports = function(app) {

	app.get('/weather/:latitude/:longitude', (req,res) => {
		var lat = req.params.latitude;
		var lon = req.params.longitude;

		var query = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lon}`
		axios.get(query).then((response) => {
			res.send({data: response.data.currently});
		}).catch((err) => {
			console.log(err);
		});
	});

	app.get('/weather/worse', (req,res) => {
		var query = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/-90.0000,-139.2667`;
		axios.get(query).then((response) => {
			res.send({data: response.data.currently});
		}).catch((err) => {
			console.log(err);
		});
	});
};