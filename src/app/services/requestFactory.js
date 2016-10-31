var RequestFactory = function($http){
	return {
		get : function(url, requestHeaders, successCallback, errorCallback){
			$http.get(url, requestHeaders).then(successCallback, errorCallback);
		}
	};
};

RequestFactory.$inject = ["$http"];

module.exports = RequestFactory;
