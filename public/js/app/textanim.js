define([
     "underscore"
    , "jquery"
    , "bacon"
    ]
    , function(_, $, Bacon) {


        var list = new Array("Vi er tverrfaglige","Vi drar på konferanser","Vi skaper løsninger i team");

        var count = 0;

        var text = $("#title-message").html(list[0]);

        setInterval(function(){
        	 text.fadeOut(500, function() {
        	 	count++;
        	 	if(count == list.length)count=0;
    			text.html(list[count]).fadeIn(500);
  			});
       		
        },10000);
        

});