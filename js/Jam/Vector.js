

define(["lib/mootools-core"], function() {
	
    var Vector = new Class({
        
        angle : 0.0,
        magnitude : 0,
        
        initialize : function(angle, magnitude) {
            this.angle = angle;
            this.magnitude = magnitude;
        },

        getAngle : function() {
            return this.angle;
        }
    });

	return Vector;
});