homepageApp.service("openWeather", ["$http", function($http) {
	this.appId = "9e025947223cbcb3d8282f363a73648a";
	this.city = "Calgary, AB";
	this.count = 1;
	this.tempUnit = "C";
	this.mapDomElement = createDomElement();
	
	this.submit = function() {
		return $http({
			method: "GET",
			url: "http://api.openweathermap.org/data/2.5/forecast/daily",
			params: {
				appid: this.appId,
				q: this.city,
				cnt: this.count
			}
			});
		}
	
	this.initializeMap = function initializeMap(longitude, latitude) {
		var map = new google.maps.Map(mapDomElement, {
			zoom: 4,
			center: {lat: longitude, lng: latitude},
			disableDefaultUI: false
		});
		console.log(map.getCenter().toString());
		console.log(map.getZoom());
	}
	
	function createDomElement() {
		var toReturn = document.createElement("div");
		toReturn.setAttribute("style", "height: 500px; width: 100%");
		return toReturn;
	}
}]);