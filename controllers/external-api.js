const axios = require('axios');
const request = require('request');
const reverse = require('reverse-geocode')
require('dotenv').config();

module.exports = function(app) {
	app.get('/weather/:latitude/:longitude', (req,res) => {
		var lat = req.params.latitude;
		var lon = req.params.longitude;

		var query = `https://api.openweathermap.org/data/2.5/weather?zip=${reverse.lookup(lat,lon,'us').zipcode},us&APPID=${process.env.WEATHER_API_KEY}`;

		axios.get(query).then((response) => {
			res.json(response.data);
		}).catch((err) => {
			res.json(err);
		});
	});

	app.get('/weather/worse', (req,res) => {
		var query = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/-90.0000,-139.2667`;
		request(query, {json:true},(err,response,body) => {
			if(err) return console.log(err);
			res.json(body.currently);
		});
	});
};