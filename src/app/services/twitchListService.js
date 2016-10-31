var TwitchListService = function(RequestFactory){
	var apiBaseUrl = "https://api.twitch.tv/kraken/";
	var playerBaseUrl = "https://player.twitch.tv/?channel=";

	this.requestStream = function(str){
		var result = {};
		var requestHeader = {
			headers: {
				'Client-ID': '24geemvcr6deyxmx8ocqnmr7v3l8hg9'
			}
		};
		result.name = str;
		RequestFactory.get(apiBaseUrl + "channels/" + str, requestHeader, function(response){
			result.avatar = (response.data.logo !== null) ? response.data.logo : "images/150x150-placeholder.png";
			result.url = playerBaseUrl + result.name;

			RequestFactory.get(apiBaseUrl + "streams/" + str, requestHeader, function (response){
				result.status = (response.data.stream !== null) ? "online" : "offline";
			});
		}, function(){
			result.avatar = "images/150x150-placeholder.png";
			result.url = "http://twitch.tv/404/404";
		});
		return result;
	}
};

TwitchListService.$inject = ["requestFactory"];

module.exports = TwitchListService;
