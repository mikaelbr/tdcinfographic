requirejs.config({
    paths : {
        "domReady" : "require/domReady",
        "jquery" : "lib/jquery.min",
        'socketio': '../socket.io/socket.io',
    },
    shim : {
    	'socketio': {
	      exports: 'io'
	    }
    }
});

require(["socketio"], function(io) {

	
	var socket = io.connect('http://localhost');
	socket.on("data", function (data) {
		// Change graphs..
		console.log(data.toString());
	});
});

require(["Analytics/AnalyticsExtra"]);