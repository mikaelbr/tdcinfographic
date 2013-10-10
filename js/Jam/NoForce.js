define(["lib/mootools-core", "Jam/Force", "Jam/Easing"], function(m, Force, Easing) {
	
	var NoForce = new Class({
        Extends : Force,
        
        initialize : function() {
            this.parent(0, 0, 0, Easing.quadInOut);
        }
    });

    return NoForce;
});