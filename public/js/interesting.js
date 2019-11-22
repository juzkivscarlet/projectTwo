$(document).ready(function() {

	var Weather = function(location,place,temp,sky,wind) {
		// location = "here" | "worse" | "better"
		// place is actual location name
		this.place = {
			city: place[0],
			country: place[1]
		};
		// this.temp=[fahrenheit,celsius]
		this.temp = {
			celsius: temp[0],
			fahrenheit: temp[1]
		};
		this.sky = sky;
		this.windspeed = {
			kmph: wind[0],
			mph: wind[1]
		};
		this.writePage(location);
		console.log(this);
	};

	Weather.prototype.writePage = function(location) {
		var divs = {
			place: [$(`#${location}-city`),$(`#${location}-country`)],
			description: $(`#weather-${location}-desc`),
			temp: [$(`#${location}-temp-f`),$(`#${location}-temp-c`)],
			winds: [$(`#${location}-wind-imp`),$(`#${location}-wind-met`)]
		};

		divs.place[0].text(this.place.city+", ");
		divs.place[1].text(this.place.country);
		divs.description.text(this.sky);

		divs.temp[0].html(this.temp.fahrenheit+" &deg;F");
		divs.temp[1].html(this.temp.celsius+" &deg;C");
		
		divs.winds[0].html(this.windspeed.mph+" mph");
		divs.winds[1].html(this.windspeed.kmph+" km/hr");
	};

	function convertTemp(desiredUnit,a) {
		// fahrenheit -> celsius
		if(desiredUnit=="cel") {
			return parseFloat((a-32)*(5/9)).toFixed(1);
		} else if(desiredUnit=="fahr") {
			// celsius -> fahrenheit
			return parseFloat(a*(9/5)+32).toFixed(1);
		}
	}

	function convertWindSpeed(a,originalUnit) {
		if(originalUnit=='m/s') return parseFloat(a*3.6).toFixed(1);
		else if(originalUnit=='km/h') return parseFloat(a/1.609).toFixed(1);
		else if(originalUnit=='mph') return parseFloat(a*1.609).toFixed(1);
	}

	var getLocation = (pos,crd) => {
		var query;
		if(pos=='here' && crd) {
			query = `/${crd[0]}/${crd[1]}`;
		} else if(pos=='worse') {
			query = '/worse';
		} else if(pos=='better') {
			query = '/better';
		}
		getQuery(query,pos);
	};

	var decipherCoordinates = function() {
		if(navigator.geolocation) {
			var options = {
				success: function(pos) {
					getLocation('here',[pos.coords.latitude,pos.coords.longitude]);
				}
			}
			navigator.geolocation.getCurrentPosition(options.success);
		}
	};

	var getQuery = (route,pos) => {
		var query = '/weather'+route;
		$.get(query).then((response) => {
			getWeather(response);
		});
	};

	var getWeather = (data,pos) => {
		console.log(data);
		// $.get('/weather'+query).then((response) => {
			// console.log(response);
			// if(pos=='here') {
			// 	var place = [response.location.city, response.location.state_abbr, response.location.zipcode];
			// } else if(pos=='worse') {
			// 	var place = ['South Pole', 'Antarctica', 'Amundsen-Scott Research Station'];
			// }

			// var temps = [
			// 	response.data.temperature,
			// 	convertTemp('fahr', response.data.temperature)
			// ];

			// var correctedWind = convertWindSpeed(response.data.wind.speed, 'm/s');
			// var winds = [
			// 	correctedWind,
			// 	convertWindSpeed(correctedWind, 'mph')
			// ];

			// var weather = new Weather(pos, place, temps, response.data.summary, winds);
		// });
	};

	decipherCoordinates();
	getLocation('worse');
});