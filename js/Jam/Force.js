define(["lib/mootools-core", "Jam/Vector", "Jam/MathUtils"], function(m, Vector, MathUtils) {
	

    var Force = new Class({
        Extends : Vector,
        
        acceleration : 0.1,
        duration : 500,
        delay : 0,
        increaseMagnitude : true,
        
        startTime : 0,
        currentMagnitude : 0,
        
        initialize : function(angle, magnitude, duration, increaseMagnitude) {
            this.parent(angle, magnitude);
            
            this.duration = duration;
            this.increaseMagnitude = increaseMagnitude;

            this._initMagnitude();
        },

        _initMagnitude : function() {
            this.currentMagnitude = (this.increaseMagnitude) ? 0 : this.magnitude;
            this.startTime = new Date().getTime() + this.delay;
        },

        setDelay : function(delay) {
            this.delay = delay;
            this.startTime += this.delay;
        },

        setAcceleration : function(acceleration) {
            this.acceleration = acceleration;
        },

        setDuration : function(duration) {
            this.duration = duration;
        },

        hasStarted : function() {
            return new Date().getTime() > (this.startTime);
        },

        hasFinished : function() {
            return new Date().getTime() >= (this.startTime + this.duration);
        },
        
        getCurrentMagnitude : function(processing) {
            
            var now = Date.now();
            
            if(this.startTime === 0) {
                this.startTime = now;
            }
            
            if(this.hasFinished()) {
                return this.currentMagnitude;
            }

            var from, to = 0;
            if(this.increaseMagnitude) {
                from = 0;
                to = this.magnitude;
            }
            else {
                from = this.magnitude;
                to = 0;
            }
            var m = processing.map(now, 
                this.startTime, this.startTime + this.duration,
                from, to);

            // Debug stuff
            // var goCoords = MathUtils.coordsFromPointGivenAngleAndMagnitude(dot.x, dot.y, this.getAngle(), m);

            // processing.stroke(255);
            // processing.line(dot.x, dot.y, goCoords.x, goCoords.y);
            // End debug stuff

            this.currentMagnitude = m;
            return m;
        }
    });

    return Force;

});