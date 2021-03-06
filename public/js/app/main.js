define([
      "socketio"
    , "underscore"
    , "jquery"
    , "bacon"
    , "app/graphs"
    , "app/size"
    ]
    , function(io, _, $, Bacon, graph, size) {

    // Initiate helpers
    var maxWeight = 20000
      , socket = io.connect()
      , $indiNum = $('#number-individual')
      , $totalNum = $('#number-total')
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

    var accumulation = Bacon.fromEventTarget(socket, 'sample');

    // Handle current weight
    var incremented = Bacon
                        .fromEventTarget(socket, 'grams')
                        .filter(_.isNumber)
                        .map(Number);

    // Update graph
    incremented.onValue(setHeightOf(graph.currentWeight));

    // Update text for total weight
    incremented.assign($indiNum, "text");


    var initialWeight = Bacon.fromPromise($.getJSON('/total'))
                            .map(function (data) {
                                return data.value;
                            })
                            .filter(_.isNumber);

    // Handle total weight.
    var addedWeight = incremented
                        .toProperty(0)
                        .sampledBy(accumulation)
                        .scan(0, add);

    var totalWeight = initialWeight.combine(addedWeight, add);

    // Update graph
    totalWeight
        .map(toFitMaxKilos)
        .onValue(setHeightOf(graph.totalWeight));

    // Update text for total weight
    totalWeight.assign($totalNum, "text");
});