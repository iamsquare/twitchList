var RequestFactory = function($http){
	return {
		get : function(url, obj, successCallback, errorCallback){
			$http.get(url, obj).then(successCallback, errorCallback);
		}
	};
};

RequestFactory.$inject = ["$http"];

module.exports = RequestFactory;
