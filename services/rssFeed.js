homepageApp.factory('rssFeed',['$http',function($http){
	return {
		parseFeed : function(url) {
			return $http.jsonp("http://rss.cnn.com/rss/cnn_topstories.rss");
	}}
}]);