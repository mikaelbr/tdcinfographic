require([
      "socketio"
    , "underscore"
    , "jquery"
    , "bacon"
    ]
    , function(io, _, $, Bacon) {

    var socket = io.connect()
      , onClick = $(".button").asEventStream('click');

    onClick // Todo: throttle-esc
        .onValue(function () {
            socket.emit('sample');
        });
});