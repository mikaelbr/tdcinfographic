requirejs.config({
    paths : {
        "domReady" : "require/domReady",
        "jquery" : "lib/jquery.min",
        'socketio': '../socket.io/socket.io',
        'raphael': 'lib/raphael',
        'underscore': 'lib/underscore',
        'bacon': 'lib/bacon',
    },
    shim : {
        'socketio': {
          exports: 'io'
        },
        'underscore': {
          exports: '_'
        },
        'bacon': ['jquery']
    }
});

require([
      "socketio"
    , "underscore"
    , "jquery"
    , "bacon"
    , "graphs"
    , "size"
    ]
    , function(io, _, $, Bacon, graph, size) {

    // Initiate helpers
    var maxWeight = 40000
      , socket = io.connect()
      , $indiNum = $('#number-individual')
      , $totalNum = $('#number-total')
      , sampleButton = $('#sample').asEventStream('click')
      , toFitMaxKilos = function (total) { return (total / maxWeight) * size.height; }
      , add = function(a, b) { return a + b; }
      , setHeightOf = function (el) {
        return function (weight) {
            el.animate({
                y: size.height - weight,
                height: weight
            }, 200, "easeIn");
        };
    };

    // Handle current weight
    var incremented = Bacon
                        .fromEventTarget(socket, 'grams')
                        .filter(_.isNumber)
                        .map(Number);

    // Update graph
    incremented.onValue(setHeightOf(graph.currentWeight));

    // Update text for total weight
    incremented.assign($indiNum, "text");


    // Handle total weight.
    var totalWeight = incremented
                        .toProperty("")
                        .sampledBy(sampleButton)
                        .scan(0, add);

    // Update graph
    totalWeight
        .map(toFitMaxKilos)
        .onValue(setHeightOf(graph.totalWeight));

    // Update text for total weight
    totalWeight.assign($totalNum, "text");
});

require(["Analytics/AnalyticsExtra"]);
