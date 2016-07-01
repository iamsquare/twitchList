var module = angular.module("twitchList", []);
module.controller("mainController", ["$http", function($http){

	var baseUrl = "https://api.twitch.tv/kraken/";
	var playerUrl = "https://player.twitch.tv/?channel=";
	var channels = ["freecodecamp", "sing_sing", "sheevergaming", "brunofin", "comster404"];

	var self = this;
	self.results = [];

	angular.forEach(channels, function(value){

		var result = {};
		$http.get(baseUrl + "channels/" + value).then(function(response){

			result.logo = response.data.logo;
			result.name = "@" + response.data.name;
			result.title = response.data.status;
			result.url = playerUrl + result.name;

			$http.get(baseUrl + "streams/" + value).then(function(response){
				result.status = response.data.stream !== null ? "online" : "offline";
			});

			self.results.push(result);

		}, function(){

			self.results.push({
				logo : "img/150x150-placeholder.png",
				title : "Account Closed",
				name : value,
			});

		});

	});
}]);
