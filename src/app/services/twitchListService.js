var TwitchListService = function(RequestFactory, HashParserFactory){
	var apiBaseUrl = "https://api.twitch.tv/kraken/";
	var playerBaseUrl = "https://player.twitch.tv/?channel=";
	var requestHeader = {
		headers: {
			"Client-ID": "24geemvcr6deyxmx8ocqnmr7v3l8hg9"
		}
	};

	return {
		requestStream: function(str){
			var result = {};

			result.name = str;
			result.avatar = "images/150x150-placeholder.png";

			RequestFactory.get(apiBaseUrl + "channels/" + str, requestHeader, function (response){

				result.name = response.data.name;
				result.avatar = response.data.logo || result.avatar;
				result.url = playerBaseUrl + result.name;

				RequestFactory.get(apiBaseUrl + "streams/" + str, requestHeader, function (response){
					result.status = (response.data.stream !== null) ? "online" : "offline";
				}, null);

			});

			return result;
		},
		getHash: function(){
			return HashParserFactory.parse(",");
		},
		updateHash: function(obj){
			HashParserFactory.set(obj);
		}
	};
};

TwitchListService.$inject = ["requestFactory", "hashParserFactory"];

module.exports = TwitchListService;
