var angular = require('angular');

require('./controllers');
require('./services');

angular.module("twitchList", ["twitchList.controllers", "twitchList.services"]);
