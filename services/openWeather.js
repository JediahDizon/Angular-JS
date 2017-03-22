homepageApp.service("openWeather", ["$http", "NgMap", function($http, NgMap) {
	this.appId = "9e025947223cbcb3d8282f363a73648a";
	this.city = "Calgary, AB";
	this.count = 1;
	this.tempUnit = "C";
	
	this.submit = function() {
		return $http({
			method: "GET",
			url: "http://api.openweathermap.org/data/2.5/forecast/daily",
			params: {
				appid: this.appId,
				q: this.city,
				cnt: this.count
		}});
	}
	
	this.getMap = function (latitude, longitude) {
		return NgMap.getMap();
	}
}]);