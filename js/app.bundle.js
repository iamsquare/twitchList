webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var angular = __webpack_require__(1);

	__webpack_require__(3);
	__webpack_require__(5);

	angular.module("twitchList", ["twitchList.controllers", "twitchList.services"]);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var angular = __webpack_require__(1);
	var controllers = angular.module("twitchList.controllers", []);

	controllers.controller("mainController", __webpack_require__(4));

/***/ },
/* 4 */
/***/ function(module, exports) {

	var MainController = function(TwitchListService, LocationService){
		var self = this;
		var channels = TwitchListService.splitAddressHash(",");
		var results = [];

		angular.forEach(channels, function(value){
			this.push(TwitchListService.requestStream(value));
		}, results);

		self.enableTutorial = results.length === 0 ? true : false;
		self.showPanel = false;
		self.status = "All";

		self.results = [];
		self.path = LocationService.getPath();

		self.displayAll = displayAll;
		self.displayOnline = displayOnline;
		self.displayOffline = displayOffline;

		self.addChannel = addChannel;

		self.displayAll();

		function displayAll(){
			angular.forEach(results, function(value){
				this.push(value);
			}, self.results = []);
			self.status = "All";
		}

		function displayOnline(){
			angular.forEach(results, function(value){
				if(value.status === "online") this.push(value);
			}, self.results = []);
			self.status = "Online";
		}

		function displayOffline(){
			angular.forEach(results, function(value){
				if(value.status !== "online") this.push(value);
			}, self.results = []);
			self.status = "Offline";
		}

		function addChannel(value){
			if(results.length === 0) {
				LocationService.appendHash(value);
			} else {
				LocationService.appendHash("," + value);
			}
			results.push(TwitchListService.requestStream(value));
			self["display" + self.status]();
			self.enableTutorial = false;
			self.field = "";
		}
	};

	MainController.$inject = ["twitchListService", "locationService"];

	module.exports = MainController;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var angular = __webpack_require__(1);
	var services = angular.module("twitchList.services", []);

	services.factory("requestFactory", __webpack_require__(6));
	services.service("locationService", __webpack_require__(7));
	services.service("twitchListService", __webpack_require__(8));

/***/ },
/* 6 */
/***/ function(module, exports) {

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

	module.exports = RequestFactory;

/***/ },
/* 7 */
/***/ function(module, exports) {

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
			return unique(string.substr(1, string.length).split(separator));
		}
	};

	LocationService.$inject = ["$window"];

	module.exports = LocationService;

/***/ },
/* 8 */
/***/ function(module, exports) {

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

/***/ }
]);