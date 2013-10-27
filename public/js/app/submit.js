require([
      "socketio"
    , "underscore"
    , "jquery"
    , "bacon"
    ]
    , function(io, _, $, Bacon) {

    var socket = io.connect()
      , $buttonWrapper = $("#button-wrapper")
      , $maxWeightNotice = $(".max-weight-notice")
      , $thanksNotice = $(".thanks-notice")
      , limit = 300
      , isOverLimit = function (weight) {
        return weight >= limit;
    };

    var submit = $(".button")
                        .asEventStream('click')
                        .doAction(".preventDefault")
                        .filter(function (e) {
                            var $t = $(e.currentTarget);
                            return !$t.parent().hasClass("disabled");
                        });

    submit.debounceImmediate(1000)
        .onValue(function () {
            socket.emit('sample');
        });

    // Show current weight!
    var weight = Bacon.fromEventTarget(socket, 'grams')
                    .filter(_.isNumber)
                    .map(Number);

    weight.assign($("#number-individual"), "text");

    // Activate/Deactivate button, based on validity.
    var valid = weight.map(isOverLimit);
    valid.map(function (isValid) {
            return isValid ? "disabled" : "enabled";
        })
        .assign($buttonWrapper, "attr", "class");
    valid.toProperty(false).assign($maxWeightNotice, "toggle");


    // Show/Hide thank you message
    var thanks = submit.toProperty(false).map(Boolean)
    thanks.assign($thanksNotice, "toggle");
    submit.map(Boolean).delay(3000).not().log().assign($thanksNotice, "toggle")
});