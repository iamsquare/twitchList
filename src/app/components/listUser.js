var ListUser = {
	templateUrl: "templates/listUser.html",
	bindings: {
		"data": "=",
		"onDelete": "&"
	},
	controller: require("../controllers/mainController"),
	controllerAs: "vm"
};

module.exports = ListUser;
