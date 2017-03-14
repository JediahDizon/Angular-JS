homepageApp.service("openWeather", ["$http", function($http) {
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
	
	this.loadMap = function (latitude, longitude, domElement) {
		var center = {lat: latitude, lng: longitude};
		var map = new google.maps.Map(domElement, {
			zoom: 10,
			center: center,
			disableDefaultUI: true
		});
		var marker = new google.maps.Marker({
			position: center,
			map: map
		});
	}
}]);