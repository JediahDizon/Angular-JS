homepageApp.controller("rssFeedController", ["$scope", "$sce", "$timeout", "$cookies", "rssFeed", function ($scope, $sce, $timeout, $cookies, rssFeed) {
	if(!$cookies.get("rssUrl"))
		$cookies.put("rssUrl", "https://techcrunch.com/feed/");
	$scope.rssFeedURL = $cookies.get("rssUrl");
	
	
	var rssRequestDelay = 1000;
	var rssRequestTimeout;
	
	$scope.$watch("rssFeedURL", function() {
		$cookies.put("rssUrl", $scope.rssFeedURL);
		$timeout.cancel(rssRequestTimeout);
		
		rssRequestTimeout = $timeout(function() {
			rssFeed.getFeeds($scope.rssFeedURL).then(function(responseData) {
				$scope.rssFeeds = responseData.data;
				angular.forEach($scope.rssFeeds.items, function(rssFeed) {
					rssFeed.description = $sce.trustAsHtml(decodeURI(rssFeed.description));
				});
			},
			function(responseError) {
				console.log("ERROR: " + responseError);
			});
		}, rssRequestDelay)
	});
}]);