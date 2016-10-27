var RequestFactory = function($http){
	return {
		get : function(url, successCallback, errorCallback){
			$http.get(url, {
				headers: {
					'Client-ID': '24geemvcr6deyxmx8ocqnmr7v3l8hg9'
				}
			}).then(successCallback, errorCallback);
		}
	};
};

RequestFactory.$inject = ["$http"];

module.exports = RequestFactory;
