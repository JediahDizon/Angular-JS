homepageApp.controller("feedController", ['$scope','rssFeed', function ($scope,rssFeed) {
	rssFeed.parseFeed($scope.rssFeedURL).then(function(requestData) {
		$scope.rssFeeds = requestData.data.responseData.feed.entries;	
	});
}]);