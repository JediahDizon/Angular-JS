homepageApp.directive("searchForecast", function() {
	return {
		templateUrl: "/directives/templates/searchForecast.html",
		restrict: "AECM",
		replace: true
	};
});

homepageApp.directive("weatherForecast", function() {
	return {
		templateUrl: "/directives/templates/weatherForecast.html",
		restrict: "AECM",
		replace: true
	};
});

homepageApp.directive("rssFeed", function() {
	return {
		templateUrl: "/directives/templates/rssFeedCard.html",
		restrict: "AECM",
		replace: true
	};
});