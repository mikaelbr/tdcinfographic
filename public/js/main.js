requirejs.config({
    paths : {
        "domReady" : "require/domReady",
        "jquery" : "lib/jquery.min",
        'socketio': '../socket.io/socket.io',
        'raphael': 'lib/raphael',
        'underscore': 'lib/underscore',
    },
    shim : {
    	'socketio': {
	      exports: 'io'
	    },
	    'underscore': {
	      exports: '_'
	    }
    }
});

var size = {
    width: 330,
    height: 300
};

/****
 * NOTE: Quick and really dirty proof of concept/example for graphing.
 * Should rewrite massivly, but it'll work as an example.
 *****/
require(["socketio", "raphael", "underscore", "jquery"], function(io, Raphael, _, $) {

	var paper = Raphael("graph-individual", size.width, size.height),
		indi = paper.rect(0, size.height, size.width, 0);
	// Color the rectangle nicely
	indi.attr({
	    fill:'#dadada',
	    stroke:'none'
	});

	var $indiNum = $('#number-individual');
	
	var socket = io.connect();
	socket.on("data", function (data) {
		var y = parseFloat(data.toString(), 10);
		var nHeight = size.height - y;

		if ( !_.isNumber(nHeight) || !_.isNumber(y) || y <= 0 || nHeight <= 0) {
			return;
		}

		$indiNum.text(y.toFixed(2));
		indi.animate({
			y: y,
			height: nHeight
		}, 200, "easeIn");
	});
});

require(["Analytics/AnalyticsExtra"]);
