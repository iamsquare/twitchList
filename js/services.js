var services = angular.module("twitchList.services", []);

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

var LocationService = function($window){
	var search = $window.location.search;
	var hash = $window.location.hash;
	var path = $window.location.pathname;

	this.getPath = function(){
		return path;
	};

	this.appendSearch = appendSearch;

	this.appendHash = appendHash;

	this.getSearchSplit = function(separator){ return uniqueSplit(search, separator); };

	this.getHashSplit = function(separator){ return uniqueSplit(hash, separator); };

	function appendSearch(value){
		$window.location.search += value;
	}

	function appendHash(value){
		$window.location.hash += value;
	}

	function unique(array) {
		var seen = {};
		return array.filter(function(item) {
			return seen.hasOwnProperty(item) ? false : (seen[item] = true);
		});
	}

	function uniqueSplit(string, separator){
		if(string === "") return [];
		console.log("OK");
		return unique(string.substr(1, string.length).split(separator));
	}
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

	this.splitAddressSearch = function(separator){
		return LocationService.getSearchSplit(separator);
	};

	this.splitAddressHash = function(separator){
		return LocationService.getHashSplit(separator);
	};
};

TwitchListService.$inject = ["requestFactory", "locationService"];

services.factory("requestFactory", RequestFactory);
services.service("locationService", LocationService);
services.service("twitchListService", TwitchListService);
