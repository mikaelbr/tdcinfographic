define([
     "underscore"
    , "jquery"
    , "bacon"
    ]
    , function(_, $, Bacon) {


        var list = new Array("Vi er tverrfaglige","Vi drar på konferanser","Vi skaper løsninger i team");

        var count = 1;

        var text = $("#title-message").html(list[0]);

        setInterval(function(){
        	 text.fadeOut( "slow", function() {
    			text.hide().html(list[count == list.length ? 0 : count++]).fadeIn(400);
  			});
       		
        },5000);
        

});