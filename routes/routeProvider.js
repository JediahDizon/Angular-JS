homepageApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/pages/home.html'
	}).otherwise({
		redirectTo: '/'
	});
});