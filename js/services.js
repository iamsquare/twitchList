var app = angular.module("TwitchList.services", []);

var RequestFactory = function($http){
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

RequestFactory.$inject = ["$http"];

var LocationService = function($window){
	var search = $window.location.search;
	var hash = $window.location.hash;
	var path = $window.location.pathname;
	var unique = function (array) {
		var seen = {};
		return array.filter(function(item) {
			return seen.hasOwnProperty(item) ? false : (seen[item] = true);
		});
	};

	this.getPath = function(){
		return path;
	};

	this.getSearchSplit = function(char){
		if(search === "") return [];
		return unique(search.substr(1, search.length).split(char));
	};

	this.getHashSplit = function(char){
		if(hash === "") return [];
		return unique(hash.substr(1, hash.length).split(char));
	};
};

LocationService.$inject = ["$window"];

var TwitchListService = function(RequestFactory, LocationService){
	var baseUrl = "https://api.twitch.tv/kraken/";
	var playerUrl = "https://player.twitch.tv/?channel=";

	this.requestStream = function(value){
		var result = {};

		result.name = value;

		RequestFactory.get(baseUrl + "channels/" + value, function (response){

			result.logo = response.data.logo !== null ? response.data.logo : "img/150x150-placeholder.png";
			result.name = response.data.name;
			result.title = response.data.status;
			result.url = playerUrl + result.name;

			RequestFactory.get(baseUrl + "streams/" + value, function (response){
				result.status = response.data.stream !== null ? "online" : "offline";
			});

		}, function(){

			result.logo = "img/150x150-placeholder.png";
			result.name = value;
			result.title = "Account Unavailable";
			result.url = "http://twitch.tv/404/404";

		});

		return result;
	};

	this.splitAddressSearch = function(char){
		return LocationService.getSearchSplit(char);
	};
};

TwitchListService.$inject = ["RequestFactory", "LocationService"];

app.factory("RequestFactory", RequestFactory);
app.service("LocationService", LocationService);
app.service("TwitchListService", TwitchListService);
