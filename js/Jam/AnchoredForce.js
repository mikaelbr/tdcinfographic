

define(["Jam/Force", "Jam/MathUtils", "lib/mootools-core"], function(Force, MathUtils) {
   
    var AnchoredForce = new Class({
        Extends : Force,

        orgX : -1,
        orgY : -1,
        x : 0,
        y : 0,
        prevX : -1,
        prevY : -1,
        anchorX : 0,
        anchorY : 0,

        angleOffset : 0,
        angleOffsetDecay : 0.7,

        initialize : function(anchorX, anchorY, duration, magnitude, increaseMagnitude) {
            this.anchorX = anchorX;
            this.anchorY = anchorY;

            this.duration = duration;
            this.magnitude = magnitude;
            this.increaseMagnitude = this.increaseMagnitude;

            this._initMagnitude();
        },

        setAngleOffset : function(radians, decay) {
            this.angleOffset = radians;
            this.angleOffsetDecay = decay;
        },

        hasFinished : function() {
            
            if(this.prevX < 0) return false;

            // Check if it has passed by the destination
            var prevToAnchor = MathUtils.distanceBetweenTwoPoints(this.prevX, this.prevY, this.anchorX, this.anchorY);
            var nowToAnchor = MathUtils.distanceBetweenTwoPoints(this.x, this.y, this.anchorX, this.anchorY);
            var prevToNow = MathUtils.distanceBetweenTwoPoints(this.prevX, this.prevY, this.x, this.y);

            if(Math.abs((prevToAnchor + nowToAnchor) - prevToNow) > 5) {
                // Not finished, still moving towards anchor
                return false;
            }
            else {
                // Finished, moving away from anchor
                return true;
            }
        },

        updateCoords : function(x, y) {
            this.prevX = this.x;
            this.prevY = this.y;

            this.x = x;
            this.y = y;

            if(this.orgX < 0) {
                this.orgX = x;
                this.orgY = y;
            }

            // Recalc angle
            this.angle = Math.PI + MathUtils.angleBetweenTwoVectors(
                this.x, this.y, this.x - 10, this.y, // Vector pointing straight up
                this.x, this.y, this.anchorX, this.anchorY); // Vector pointing to center

            this.angle += this.angleOffset;
            this.angleOffset *= this.angleOffsetDecay;
        }
    });

    return AnchoredForce;
});