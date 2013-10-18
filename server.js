var http = require('http');
var fs = require('fs');

var ecstatic = require('ecstatic');

var server = http.createServer(ecstatic({
    root: __dirname + '/public',
    autoIndex: true,
    gzip: true
}));

var io = require('socket.io').listen(server);
io.set('log level', false)

// Get weight through WS from server and pass on to clients
io.sockets.on('connection', function (socket) {
    socket.on('weight', function (data) {
        var grams = parseFloat(data.grams, 10);
        if (!data.grams || typeof grams !== "number") {
            console.error("No valid data", data);
            return;
        }
        // broadcast to other clients..
        socket.broadcast.emit('grams', grams);
    });
});

server.listen(process.env.PORT || 3000);