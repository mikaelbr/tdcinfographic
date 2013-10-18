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
    height: 350
};

/****
 * NOTE: Quick and really dirty proof of concept/example for graphing.
 * Should rewrite massivly, but it'll work as an example.
 *****/
require(["socketio", "raphael", "underscore", "jquery"], function(io, Raphael, _, $) {
	var maxWeight = 4000;

	var total = 0;
	var totalGrams = 0;

	var paper = Raphael("graph-individual", size.width, size.height),
		indi = paper.rect(0, size.height, size.width, 0);
    
    var papertotal = Raphael("graph-total",size.width,size.height);
		var rect = papertotal.rect(0, 0, 330, 350);
		rect.attr("fill", "#636363");
		totalGraph = papertotal.rect(0,size.height,size.width,0);


	// Color the rectangle nicely
	indi.attr({
	    fill:'#dadada',
	    stroke:'none'
	});

	totalGraph.attr({
		fill: "fa44451",
		stroke:'none'
	})

	var $indiNum = $('#number-individual');
	var $totalNum = $('#number-total');
	
	var socket = io.connect();
	socket.on("data", function (data) {
		
		var weight = parseFloat(data.toString(), 10);
	
		if(_.isNaN(weight) || weight<0 || !_.isNumber(weight)){
			return;
		}
		console.log(weight);
		var y = weight;
		var nHeight = size.height - y;

	  	
		if (_.isNaN(y) || _.isNaN(nHeight) || y<0 || nHeight<0 || !_.isNumber(nHeight)) {
			return;
		}

		$indiNum.text(y.toFixed(2));
		indi.animate({
			y: nHeight,
			height: size.height - nHeight
		}, 200, "easeIn");

		total += y/(maxWeight/size.height);

		$totalNum.text((totalGrams+=y).toFixed(2)+"/4000");
		totalGraph.animate({
			y: size.height - total,
			height: total
		},200,"easeIn");
		

		console.log(total)
	});
});

require(["Analytics/AnalyticsExtra"]);
