
define(["lib/mootools-core"], function() {
    
    /**
     * Usage

    var t = new Timeline();

    t.addEvent({
        start : 1000,
        func : function(master) {
            var q1 = new Dot(30);
            q1.setCoords(this.processing.width * 0.3, this.processing.height * 0.3);

            master.addDot(q1);

            var rand = master.processing.random(3, 15);
            for(var i = 0; i < rand; i++) {
                master.addDot(master.createParticleDot(q1.x, q1.y));
            }
        }
    });

     */

     var Timeline = new Class({

        queue : [], // To be executed
        done : [], // Executed

        startTime : 0,

        initialize : function() {

        },

        addEvent : function(event) {
            this.queue.push(event);

            this.queue.sort(function(a, b) {
                return a.start - b.start;
            });
        },

        start : function() {
            this.startTime = Date.now();
        },

        /**
         * Run with each frame
         */
        draw : function(master) {
            var now = Date.now();

            // Check queue until we reach future event
            for (var i = 0; i < this.queue.length; i++) {
                var event = this.queue[i];
                if(event.start + this.startTime <= now) {
                    // Run it
                    event.func(master);
                    // Finished, remove
                    this.done.push(event);

                    this.queue.shift();
                    i--;
                }
            }
        }

     });

     return Timeline;
});