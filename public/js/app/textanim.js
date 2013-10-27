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
              "Vi er tverrfaglige."
            , "Vi drar på konferanser."
            , "Vi skaper løsninger i team."
            , "Vi har tre fagdager i året."
            , "Vi er 350 ansatte."
            , "Vi er 32 år på snitt."
            , "Vi har kontorer i Oslo og Trondheim."
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