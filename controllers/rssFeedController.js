homepageApp.controller("rssFeedController", ["$scope", "$sce", "rssFeed", function ($scope, $sce, rssFeed) {
	$scope.rssFeedURL = "https://techcrunch.com/feed/";
	$scope.$watch("rssFeedURL", function() {
		rssFeed.getFeeds($scope.rssFeedURL).$promise.then(function(responseData) {
			$scope.rssFeeds = responseData;
			angular.forEach($scope.rssFeeds.items, function(rssFeed) {
				rssFeed.description = ($sce.trustAsHtml(decodeURI(rssFeed.description)));
			});
		},
		function(responseError) {
			console.log("ERROR: " + responseError);
		});
	});
}]);