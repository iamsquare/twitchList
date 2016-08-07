var RequestFactory = function($http){
	return {
		get : function(url, successCallback, errorCallback){
			$http.get(url).then(
				successCallback,
				errorCallback);
		}
	};
};

RequestFactory.$inject = ["$http"];

module.exports = RequestFactory;