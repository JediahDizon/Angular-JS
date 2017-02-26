homepageApp.service("openWeather", ["$http", function($http) {
	this.city = "Calgary, AB";
	this.appId = "9e025947223cbcb3d8282f363a73648a";
	this.count = 1;
	this.tempUnit = "C"
	
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
}]);