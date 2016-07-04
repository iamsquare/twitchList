var controllers = angular.module("twitchList.controllers", []);

var MainController = function(TwitchListService, LocationService){
	var self = this;
	var channels = TwitchListService.splitAddressSearch(",");
	var results = [];

	angular.forEach(channels, function(value){
		this.push(TwitchListService.requestStream(value));
	}, results);

	self.enableTutorial = results.length === 0 ? true : false;

	self.results = [];
	self.path = LocationService.getPath();
	self.showPanel = false;

	self.displayAll = function(){
		angular.forEach(results, function(value){
			this.push(value);
		}, self.results = []);
		self.active = "All";
	};

	self.displayOnline = function(){
		angular.forEach(results, function(value){
			if(value.status === "online") this.push(value);
		}, self.results = []);
		self.active = "Online";
	};

	self.displayOffline = function(){
		angular.forEach(results, function(value){
			if(value.status !== "online") this.push(value);
		}, self.results = []);
		self.active = "Offline";
	};

	self.displayAll();
};

MainController.$inject = ["twitchListService", "locationService"];

controllers.controller("mainController", MainController);
