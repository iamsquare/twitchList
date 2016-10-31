var MainController = function(TwitchListService){
	var vm = this;
	var data;

	vm.users = [];

	vm.addChannel = addChannel;

	vm.removeChannel = removeChannel;

	function addChannel(str){
		vm.users.push(TwitchListService.requestStream(str));
	}

	function removeChannel(obj){
		var i = vm.users.indexOf(obj);
		if (i >= 0) vm.users.splice(i, 1);
	}
};

MainController.$inject = ["twitchListService"];

module.exports = MainController;
