homepageApp.service("IPAPI", ["$http", function($http) {
	this.city = null;
	this.region = null;
	this.country = null;
	this.longitude = 0;
	this.latitude = 0;
	
	this.getData = function() {
		return $http({
			method: "GET",
			url: "https://ipapi.co/json/"
		});
	};
	
	this.getData().then(function success(response) {
		this.city = response.city;
		this.region = response.region;
		this.country = response.country;
		this.longitude = response.longitude;
		this.latitude = response.latitude;
	});;
}]);