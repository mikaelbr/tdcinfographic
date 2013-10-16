var http = require('http');
var fs = require('fs');

var ecstatic = require('ecstatic');
var io = require('socket.io').listen(server);

var server = http.createServer(ecstatic({
    root: __dirname + '/public',
    autoIndex: true,
    gzip: true
}));

var io = require('socket.io').listen(server);

// Load paper weight script.
var w = require("./lib/weight");

// Proof of concept.
w().stdout.on('data', function (data) {
	// Broadcast kilograms to all listeners.
	io.sockets.emit("data", data.toString());
});


server.listen(process.env.PORT || 3000);