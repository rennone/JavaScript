var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {};
handle["/"] = requestHandlers.battle;
handle["/battle"] = requestHandlers.battle;
handle["/click"] = requestHandlers.click;
server.start(router.route, handle);
