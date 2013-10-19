require([
      "socketio"
    , "underscore"
    , "jquery"
    , "bacon"
    ]
    , function(io, _, $, Bacon) {

    var socket = io.connect();
    $(".button")
        .asEventStream('click')
        .doAction(".preventDefault")
        .debounceImmediate(1000)
        .onValue(function () {
            socket.emit('sample');
        });
});