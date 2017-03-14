homepageApp.service("openWeather", ["$http", function($http) {
	this.appId = "9e025947223cbcb3d8282f363a73648a";
	this.googleAPI = "AIzaSyA1nulCnFQd4aTgAERCWMUrhDitdkCO7Nc";
	this.city = "Calgary, AB";
	this.count = 1;
	this.tempUnit = "C";
	this.mapDomElement = document.createElement("div");
	
	this.submit = function() {
		return $http({
			method: "GET",
			url: "http://api.openweathermap.org/data/2.5/forecast/daily",
			params: {
					appid: this.appId,
					q: this.city || "Calgary,AB",
					cnt: this.count || 1
			}
			});
		}
	
	this.initializeMap = function initializeMap(longitutde, latitude) {
		var geoLocation = {lat: longitude, lng: latitude};
		var map = new google.maps.Map(this.mapDomElement, {
			zoom: 4,
			center: geoLocation
		});
	}
}]);