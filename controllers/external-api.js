const axios = require('axios');
const reverse = require('reverse-geocode');
require('dotenv').config();

module.exports = function(app) {

	// DARK SKY CALLS
	// Call Dark Sky API for user's current location
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

	// Call Dark Sky API for place with worse weather (South Pole, Antarctica)
	app.get('/weather/worse', (req,res) => {
		var query = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/-90.0000,-139.2667`;
		axios.get(query).then((response) => {
			res.send({data: response.data.currently});
		}).catch((err) => {
			console.log(err);
		});
	});

	// Call Dark Sky API for place with better weather (undetermined yet)
	app.get('/weather/better', (req,res) => {
		var query = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/21.3069,157.8583`;
		axios.get(query).then((response) => {
			res.send({data: response.data.currently});
		}).catch((err) => {
			console.log(err);
		});
	});

	// REVERSE GEOCODE USER LOCATION
	app.get('/geocode/:latitude/:longitude', (req,res) => {
		var lat = req.params.latitude;
		var lon = req.params.longitude;

		var data = reverse.lookup(lat,lon,'us')

		res.send({
			data: data
		});
	});

	app.get('/astrology/:sign', (req,res) => {
		var sign = req.params.sign;
		var query = "https://ohmanda.com/api/horoscope/"+sign;

		axios.get(query).then((response) => {
			res.send({
				data: response.data
			});
		});
	});
};