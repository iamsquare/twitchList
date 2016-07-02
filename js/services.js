var app = angular.module("twitchList");

var Request = function($http){
	return {
		get : function(url, successCallback, errorCallback){
			$http.get(url).then(function(response){
				successCallback(response);
			}, function(response){
				errorCallback(response);
			});
		}
	};
};

Request.$inject = ["$http"];

var LocationObject = function($window){
	var search = $window.location.search;
	var hash = $window.location.hash;
	return {
		getSearchSplit : function(char){
			if(search === "") return [];
			return search.substr(1, search.length).split(char);
		},
		getHashSplit : function(char){
			if(hash === "") return [];
			return hash.substr(1, hash.length).split(char);
		}
	};
};

LocationObject.$inject = ["$window"];

var TwitchListFactory = function(Request, LocationObject){
	return {
		requestStream : function(value){

			var baseUrl = "https://api.twitch.tv/kraken/";
			var playerUrl = "https://player.twitch.tv/?channel=";

			var result = {};

			Request.get(baseUrl + "channels/" + value, function (response){

				result.logo = response.data.logo !== null ? response.data.logo : "img/150x150-placeholder.png";
				result.name = response.data.name;
				result.title = response.data.status;
				result.url = playerUrl + result.name;

				Request.get(baseUrl + "streams/" + value, function (response){
					result.status = response.data.stream !== null ? "online" : "offline";
				});

			}, function(){

				result.logo = "img/150x150-placeholder.png";
				result.name = value;
				result.title = "Account Closed";
				result.url = "https://www.twitch.tv/404/404";

			});

			return result;
		},

		splitAddressSearch : function(char){
			return LocationObject.getSearchSplit(char);
		}
	};
};

TwitchListFactory.$inject = ["Request", "LocationObject"];

app.factory("Request", Request);
app.factory("LocationObject", LocationObject);
app.factory("TwitchListFactory", TwitchListFactory);
