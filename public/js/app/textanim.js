define([
     "underscore"
    , "jquery"
    , "bacon"
    ]
    , function(_, $, Bacon) {
        //Initialize values and help functions
        var text = $("#title-message")
            , list = ["Vi er tverrfaglige.","Vi drar på konferanser.","Vi skaper løsninger i team.","Vi har tre fagdager i året."]
            , switchText = function(value){
              text.fadeOut(500,function(){
                text.html(value).fadeIn(500);
            });
        }

        var arrayProp = Bacon.repeatedly(10000,list)
            .toProperty(list[list.length-1])
            .onValue(function(text){
                switchText(text);   
            });
});