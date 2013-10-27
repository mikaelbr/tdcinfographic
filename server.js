var http = require('http');
var storage = require('./storage');

var ecstatic = require('ecstatic');

var total = {
    value: 0,
    numRegistered: 0,
    measurements: []
}
, currentValue = 0;

var staticServer = ecstatic({
    root: __dirname + '/public',
    autoIndex: true,
    gzip: true
});

storage.read(function (stored) {
    total = stored;
});

var server = http.createServer(function (req, res) {
    if(/^\/total$/.test(req.url)) {
        res.setHeader('content-type', 'application/json');
        return res.end(JSON.stringify(total));
    }

    return staticServer(req, res);
});

var io = require('socket.io').listen(server);

// Get weight through WS from server and pass on to clients
io.sockets.on('connection', function (socket) {
    console.log("connected");
    socket.on('weight', function (data) {
        console.log("weight" + data);
        var grams = parseFloat(data.grams, 10);
        if (typeof grams !== "number") {
            console.error("No valid data", data);
            return;
        }

        currentValue = grams;
        // broadcast to other clients..
        socket.broadcast.emit('grams', grams);
    });

    socket.on('sample', function () {
        console.log("sample");
        total.value += currentValue;
        total.numRegistered += 1;
        total.measurements.push([total.numRegistered, currentValue]);
        storage.write(total);
        socket.broadcast.emit('sample');
    });
});

server.listen(process.env.PORT || 3000);