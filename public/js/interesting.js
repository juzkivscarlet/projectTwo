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

	var getLocation = () => {
		if(navigator.geolocation) navigator.geolocation.getCurrentPosition(getWeatherHere);
		else getWeatherHere(null);
	};

	var getWeatherHere = (pos) => {
		if(pos==null) {

		} else {
			console.log("Latitude: "+pos.coords.latitude);
			console.log("Longitude: "+pos.coords.longitude);

			$.get(`/weather/${pos.coords.latitude}/${pos.coords.longitude}`).then((data) => {
				// console.log(data);

				var place = [data.name, data.sys.country];

				// OpenWeather gives temperature in Kelvin
				var correctedTemp = parseInt(data.main.temp-273.15);
				var temps = [
					correctedTemp,
					convertTemp('fahr',correctedTemp)
				];

				// OpenWeather gives wind speed in meters/second
				// first convert wind speed to km/h
				var correctedWind = convertWindSpeed(data.wind.speed,'m/s');
				// convert metric to imperial: km/h -> mph
				var winds = [
					correctedWind,
					convertWindSpeed(correctedWind,'mph')
				];

				var weatherHere = new Weather('here',place,temps,data.weather[0].main,winds);
			});
		}
	};

	var getSuckyWeather = () => {
		$.get('/weather/worse').then((data) => {
			var place = ['South Pole', 'Antarctica'];

			// Dark Sky return temperature in Celsius.
			var temps = [
				data.temperature,
				convertTemp('fahr',data.temperature)
			];

			// Dark Sky returns wind speed in m/s
			var correctedWind = convertWindSpeed(data.windSpeed,'m/s');
			var winds = [
				correctedWind,
				convertWindSpeed(correctedWind,'mph')
			];

			var weatherWorse = new Weather('worse',place,temps,data.summary,winds);
		});
	};

	getLocation();
	getSuckyWeather();
});