define([
     "underscore"
    , "jquery"
    , "bacon"
    ]
    , function(_, $, Bacon) {
        //Initialize values and help functions
        var $text = $("#title-message")
          , delay = 10000
          , sentenceList = [
            "Vi er tverrfaglige.",
            "Vi drar på konferanser.",
            "Vi skaper løsninger i team.",
            "Vi har tre fagdager i året."
          ]
          , switchSentence = function($el){
            return function (value) {
              $el.fadeOut(500,function(){
                $el.html(value).fadeIn(500);
              });
            };
          };

        var sentence = Bacon.repeatedly(delay, sentenceList)
                            .toProperty(_.last(sentenceList))
                            .onValue(switchSentence($text));
});