var app = angular.module("TwitchList.controllers", []);

var MainController = function(TwitchListService, LocationService){

	var self = this;
	var channels = TwitchListService.splitAddressSearch(",");
	var results = [];

	angular.forEach(channels, function(value){
		this.push(TwitchListService.requestStream(value));
	}, results);

	if(results.length === 0) self.disableTutorial = true;

	self.results = [];
	self.path = LocationService.getPath();

	self.displayAll = function(){
		angular.forEach(results, function(value){
			this.push(value);
		}, self.results = []);
	};

	self.displayOnline = function(){
		angular.forEach(results, function(value){
			if(value.status === "online") this.push(value);
		}, self.results = []);
	};

	self.displayOffline = function(){
		angular.forEach(results, function(value){
			if(value.status !== "online") this.push(value);
		}, self.results = []);
	};

	/*self.sort = function(value){
		self.results.sort(function (a, b){
			if(a[value] > b[value]){
				return 1;
			}
			if(a[value] === b[value]){
				return 0;
			}
			if(a[value] < b[value]){
				return -1;
			}
		});
	};*/

	self.displayAll();
};

MainController.$inject = ["TwitchListService", "LocationService"];

app.controller("MainController", MainController);
