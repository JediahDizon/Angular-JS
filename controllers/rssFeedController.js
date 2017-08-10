homepageApp.controller("rssFeedController", ["$scope", "$sce", "$timeout", "$cookies", "rssFeed", function ($scope, $sce, $timeout, $cookies, rssFeed) {
	$scope.rssURLs = [
		{title: "CTV News", url: "http://ctvnews.ca/rss/TopStories"},
		{title: "CNN Tech News", url: "http://rss.cnn.com/rss/cnn_tech.rss"},
		{title: "Equestria Daily", url: "https://EquestriaDaily.com/feeds/posts/default"}
	];
	$scope.addUrl = function(toAdd) {
		if(toAdd.title.length > 0 && toAdd.url.length > 0) {
			$scope.rssURLs.push(toAdd);	
		}
	}
	
	if(!$cookies.get("rssUrl")) {
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() + 365);
		$cookies.put('rssUrl', 'https://techcrunch.com/feed/', {'expires': expireDate});
	}
	$scope.rssFeedURL = $cookies.get("rssUrl");

	var rssRequestDelay = 1000;
	var rssRequestTimeout;
	
	$scope.$watch("rssFeedURL", function() {
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() + 365);
		$cookies.put("rssUrl", $scope.rssFeedURL, {'expires': expireDate});
		$timeout.cancel(rssRequestTimeout);
		
		rssRequestTimeout = $timeout(function() {
				rssFeed.getFeeds($scope.rssFeedURL).then(function (responseData) {
					if (responseData.data && responseData.data.status === "ok") {
						$scope.rssFeeds = responseData.data;
						angular.forEach($scope.rssFeeds.items, function (rssFeed) {
							rssFeed.description = $sce.trustAsHtml(rssFeed.description);
						});
					} else if (responseData.data.status === "error") {
						$scope.rssFeeds = {
								items: [{
									title: "No data",
									description: $sce.trustAsHtml("<p>Please check the RSS URL.</p><hr />" +
											"<p>Message:</p>" +
											"<div class='card'><div class='card-block'><p>" + 
											responseData.data.message + 
											"</p></div></div>")
								}]
							};
					}}, function(responseError) {
				console.log("ERROR: " + responseError);
			});
		}, rssRequestDelay);
	});
	
	$scope.changeUrl = function(replacementUrl) {
		if($scope.rssFeedURL !== replacementUrl) {
			$scope.rssFeeds.items = [];
			$scope.rssFeedURL = replacementUrl;
		}
	};
}]);