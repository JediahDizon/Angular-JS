homepageApp.service('rssFeed',['$http', "$sce", function($http, $sce) {
	this.getFeeds = function(rssURL) {
		return $http({
			method: "GET",
			url: "https://api.rss2json.com/v1/api.json",
			headers: {
				'Cache-Control' : 'no-cache'
			},
			params: {
				rss_url: rssURL
		}});
}}]);