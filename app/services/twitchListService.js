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

module.exports = TwitchListService;