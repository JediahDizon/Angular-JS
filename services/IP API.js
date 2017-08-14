homepageApp.service("IPAPI", ["$http", function($http) {
	this.city = null;
	this.region = null;
	this.country = null;
	this.longitude = 0;
	this.latitude = 0;
	
	this.submit = function() {
		return $http({
			method: "GET",
			url: "https://ipapi.co/json/"
		});
	};
	
	this.submit().then(function success(response) {
		this.city = response.data.city;
		this.region = response.data.region;
		this.country = response.data.country;
		this.longitude = response.data.longitude;
		this.latitude = response.data.latitude;
	});
}]);