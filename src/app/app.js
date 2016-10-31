var angular = require("angular");

angular.module("twitchList", ["twitchList.controllers", "twitchList.services", "twitchList.components"]);

//"ngRoute", "twitchList.routes"
require("./controllers");
require("./services");
//require("./routes");
require("./components");
