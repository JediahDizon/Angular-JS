homepageApp.service('rssFeed',['$resource', function($resource) {
	this.getFeeds = function(rssURL) {
		var toReturn = $resource("https://api.rss2json.com/v1/api.json", {
			callback: "JSON_CALLBACK"
		}, { get: {
				method: "JSONP"
		}});
		return toReturn.get({rss_url : rssURL});
	};
}]);