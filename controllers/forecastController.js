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
	/*
	 * This timeout function serves the purpose of changing the unit of the temperature
	 * displayed in the city's weather information for UX. The reason why we couldn't just
	 * use the typical $scope.$watch to watch the value of the checkbox is because
	 * the Bootstrap Toggle alters the HTML in a way that the checkbox element
	 * goes out of the Angular JS context, so $watch would not work.
	 * 
	 * Instead, a probable solution to this is to have a timeout function
	 * that looks up the value of the checkbox and assign the unit accordingly
	 * and it does that 10 times a second to give the illusion that it's 
	 * instantaneous.
	 */
	$timeout(function tempUnitChange() {
		var checkboxElement = $("[type='checkbox'")[0];
		if (checkboxElement)
			$scope.tempUnit = checkboxElement.checked ? "Celcius" : "Farenheit";
		$timeout(tempUnitChange, 100);
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
			}, function failure(response) {
				$scope.weatherResult.message = "There was an error: " + response + ".\nThis is most likely a browser security functionality that blocks HTTP requests over HTTPS. To see the weather data, please enable it.";
		});
	};
	$scope.convertToCelcius = function(degKelvin) {
		return Math.round(degKelvin - 273.15);
	};
	$scope.convertToFarenheit = function(degKelvin) {
		return Math.round((degKelvin * (9/5)) - 459.67);
	};
	
}]);