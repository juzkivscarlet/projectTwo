$(document).ready(function() {

	// Constructor for Weather data
	var Weather = function(data) {
		// location = "here" | "worse" | "better"
		// place is actual location name
		this.place = {
			city: data.place[0],
			state: data.place[1]
		};
		// this.temp=[fahrenheit,celsius]
		this.temp = {
			celsius: data.temp[1],
			fahrenheit: data.temp[0]
		};
		this.sky = data.sky;
		this.windspeed = {
			kmph: data.wind[1],
			mph: data.wind[0]
		};
	};

	// Function to write page with weather data
	Weather.prototype.writePage = function(location) {
		var divs = {
			place: [$(`#${location}-city`),$(`#${location}-country`)],
			description: $(`#weather-${location}-desc`),
			temp: [$(`#${location}-temp-f`),$(`#${location}-temp-c`)],
			winds: [$(`#${location}-wind-imp`),$(`#${location}-wind-met`)]
		};

		divs.place[0].text(this.place.city+", ");
		divs.place[1].text(this.place.state);
		divs.description.text(this.sky);

		divs.temp[0].html(this.temp.fahrenheit+" &deg;F");
		divs.temp[1].html(this.temp.celsius+" &deg;C");
		
		divs.winds[0].html(this.windspeed.mph+" mph");
		divs.winds[1].html(this.windspeed.kmph+" km/hr");
	};

	// convert temperatures from fahrenheit-celsius or vice versa
	function convertTemp(desiredUnit,a) {
		// fahrenheit -> celsius
		if(desiredUnit=="cel") {
			return parseFloat((a-32)*(5/9)).toFixed(1);
		} else if(desiredUnit=="fahr") {
			// celsius -> fahrenheit
			return parseFloat(a*9/5+32).toFixed(1);
		}
	}

	// convert wind speed units to either km/h or mph
	function convertWindSpeed(a,originalUnit) {
		// if originalUnit m/s, we want km/h
		if(originalUnit=='m/s') return parseFloat(a*3.6).toFixed(1);
		// convert from km/h to mph or vice versa
		else if(originalUnit=='km/h') return parseFloat(a/1.609).toFixed(1);
		else if(originalUnit=='mph') return parseFloat(a*1.609).toFixed(1);
	}

	// FUNCTIONS TO GET WEATHER DATA

	// gather coordinates for user location
	var decipherCoordinates = function() {
		if(navigator.geolocation) {
			var options = {
				success: function(pos) {
					getUserLocation([pos.coords.latitude, pos.coords.longitude]);
				}
			}
			navigator.geolocation.getCurrentPosition(options.success);
		}
	};

	// get reverse-geocode data for user location
	var getUserLocation = (pos) => {
		$.get(`/geocode/${pos[0]}/${pos[1]}`).then((data) => {
			var results = [data.data.city, data.data.state];
			getWeather('here', [pos[0],pos[1]], results);
		});
	};

	// get weather data, pass along to postWeather() function
	var getWeather = (pos,crd,location) => {
		// setup query
		var route;
		if(crd && location) {
			// for user location
			route = `/${crd[0]}/${crd[1]}`;
		} else if(pos=='worse') {
			route = '/worse';
			location = ['South Pole', 'Antarctica'];
		} else if(pos=='better') {
			route = '/better';
			location = ['Honolulu', 'Hawaii'];
		}
		var query = '/weather'+route;

		// get weather data
		$.get(query).then((response) => {

			// console.log(response);

			// correct data units to desirable units
			var correctedWind = convertWindSpeed(response.data.windSpeed, 'm/s');

			// organize data
			var data = {
				place: location,
				temp: [response.data.temperature, convertTemp('cel', response.data.temperature)],
				sky: response.data.summary,
				wind: [correctedWind, convertWindSpeed(correctedWind, 'mph')]
			};

			console.log(data);

			var weather = new Weather(data);
			weather.writePage(pos);
		})
	};

	decipherCoordinates();
	getWeather('worse');
	getWeather('better');
});