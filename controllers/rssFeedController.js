homepageApp.controller("rssFeedController", ["$scope", "$sce", "rssFeed", function ($scope, $sce, rssFeed) {
	if($cookies.get("rssUrl"))
		$cookies.put("rssUrl", "https://techcrunch.com/feed/");
	$scope.rssFeedURL = $cookies.get("rssUrl");
	$scope.$watch("rssFeedURL", function() {
		$cookies.put("rssUrl", $scope.rssFeedURL);
		rssFeed.getFeeds($scope.rssFeedURL).$promise.then(function(responseData) {
			$scope.rssFeeds = responseData;
			angular.forEach($scope.rssFeeds.items, function(rssFeed) {
				rssFeed.description = $sce.trustAsHtml(decodeURI(rssFeed.description));
			});
		},
		function(responseError) {
			console.log("ERROR: " + responseError);
		});
	});
}]);