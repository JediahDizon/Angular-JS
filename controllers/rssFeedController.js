homepageApp.controller("rssFeedController", ["$scope", "$sce", "$timeout", "$cookies", "rssFeed", function ($scope, $sce, $timeout, $cookies, rssFeed) {
	if(!$cookies.get("rssUrl"))
		var todaysDate = new Date();
		$cookies.put("rssUrl", "https://techcrunch.com/feed/", {"expires": new Date(todaysDate.getFullYear() + 1, todaysDate.getMonth(), todaysDate.getDate())});
	$scope.rssFeedURL = $cookies.get("rssUrl");
	console.log($cookies.get("rssUrl"));
	
	
	var rssRequestDelay = 1000;
	var rssRequestTimeout;
	
	$scope.$watch("rssFeedURL", function() {
		$cookies.put("rssUrl", $scope.rssFeedURL);
		$timeout.cancel(rssRequestTimeout);
		
		rssRequestTimeout = $timeout(function() {
				rssFeed.getFeeds($scope.rssFeedURL).then(function (responseData) {
					console.log(responseData);
					if (responseData.data && responseData.data.status === "ok") {
						$scope.rssFeeds = responseData.data;
						angular.forEach($scope.rssFeeds.items, function (rssFeed) {
							rssFeed.description = $sce.trustAsHtml(decodeURI(rssFeed.description));
						});
					} else if (responseData.data.status === "error") {
						$scope.rssFeeds = {
								items: [{
									title: "No data",
									description: $sce.trustAsHtml("<p>Please check the RSS URL.</p>")
								}]
							};
					}}, function(responseError) {
				console.log("ERROR: " + responseError);
			});
		}, rssRequestDelay);
	});
}]);