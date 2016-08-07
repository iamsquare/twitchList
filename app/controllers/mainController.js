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