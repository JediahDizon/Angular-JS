homepageApp.controller("rssFeedController", ["$scope", "$sce", "$timeout", "$cookies", "rssFeed", function ($scope, $sce, $timeout, $cookies, rssFeed) {
	$scope.rssURLs = [
		{title: "CTV News", url: "http://ctvnews.ca/rss/TopStories"},
		{title: "Tech Crunch", url: "https://techcrunch.com/feed/"},
		{title: "Equestria Daily", url: "https://EquestriaDaily.com/feeds/posts/default"}
	];
	
	if (typeof(Storage) !== "undefined") {
		for(var index in localStorage) {
			$scope.rssURLs.push(localStorage[index]);
		}
	}
	
	$scope.addUrl = function(toAdd) {
		if(toAdd.title.length > 0 && toAdd.url.length > 0) {
			var placeHolder = angular.copy(toAdd, placeHolder);
			$scope.rssURLs.push(placeHolder);	
			if (typeof(Storage) !== "undefined") {
			    localStorage.setItem(toAdd.title, toAdd.url);
			}
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
							var textArea = document.createElement('textarea');
							textArea.innerHTML = rssFeed.title;
							rssFeed.title = textArea.value;
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