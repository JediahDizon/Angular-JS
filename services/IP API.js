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
}]);