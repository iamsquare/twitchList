var app = angular.module("twitchList");

var TwitchListFactory = function($http, $window){
	var obj = {};

	obj.requestStream = function(value){

		var baseUrl = "https://api.twitch.tv/kraken/";
		var playerUrl = "https://player.twitch.tv/?channel=";

		var result = {};

		$http.get(baseUrl + "channels/" + value).then(function success(response){

			result.logo = response.data.logo !== null ? response.data.logo : "img/150x150-placeholder.png";
			result.name = response.data.name;
			result.title = response.data.status;
			result.url = playerUrl + result.name;

			$http.get(baseUrl + "streams/" + value).then(function success(response){
				result.status = response.data.stream !== null ? "online" : "offline";
			});

		}, function error(){

			result.logo = "img/150x150-placeholder.png";
			result.title = "Account Closed";
			result.name = value;

		});

		return result;
	};

	obj.splitAddressSearch = function(){

		var search = $window.location.search;
		var array = [];

		if(search !== ""){
			angular.forEach(search.substr(1, search.length).split(","), function(value){
				array.push(value);
			});
		}

		return array;
	};

	return obj;
};

TwitchListFactory.$inject = ["$http", "$window"];

app.factory("TwitchListFactory", TwitchListFactory);
