var services = angular.module("twitchList.services", []);

services.service("twitchListService", require("./twitchListService"));
services.factory("requestFactory", require("./requestFactory"));
