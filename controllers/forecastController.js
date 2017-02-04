homepageApp.controller("forecastController", ["$scope", "$http", "$timeout", "openWeather", function($scope, $http, $timeout, openWeather) {
	$scope.city = openWeather.city;
	$scope.$watch("city", function() {
		openWeather.city = $scope.city;
		Ladda.stopAll();
	});
	
	$scope.tempUnit = openWeather.tempUnit
	$scope.$watch("tempUnit", function() {
		openWeather.tempUnit = $scope.tempUnit;
	});
	
	$timeout(function tempUnitChange() {
		try {
			$scope.tempUnit = $("[type='checkbox'")[0].checked ? "Celcius" : "Farenheit";
		} catch(errorEvent) {
			//Checkbox doesn't exist yet.
		}
		$timeout(tempUnitChange, 100)
	}, 100);
	
	$scope.submit = function() {
	$http({
		method: "GET",
		url: "http://api.openweathermap.org/data/2.5/forecast/daily",
		params: {
					appid: openWeather.appId,
					q: openWeather.city || "Calgary,AB",
					cnt: openWeather.count || 1
		}
	}).then(function success(response) {
		$scope.weatherResult = response.data;
		setTimeout(function() { Ladda.stopAll(); }, 500);
	});
	};
	$scope.submit();
	$scope.convertToCelcius = function(degKelvin) {
		return Math.round(degKelvin - 273.15);
	}
	$scope.convertToFarenheit = function(degKelvin) {
		return Math.round((degKelvin * (9/5)) - 459.67);
	}
}]);