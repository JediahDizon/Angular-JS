homepageApp.service('rssFeed',['$http', "$sce", function($http, $sce) {
	this.getFeeds = function(rssURL) {
		var baseUrl = "https://api.rss2json.com/v1/api.json?rss_url=" + rssURL;
		
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