define(["Jam/Dot", "Jam/Force", "Jam/AnchoredForce", "Jam/Easing", "lib/mootools-core", "lib/mootools-more", "lib/processing"], function(Dot, Force, AnchoredForce, Easing) {


    var Master = new Class({

        // Settings
        dotColors: [
            [50, 38, 26], // Brown
            [133, 115, 98], // Beige
            [203, 192, 183], // Almost white
            [16, 100, 112], // Turquoise
            [240, 78, 82] // Red
        ],

        drawCallback : [],

        processing: null,
        processingInstance: null,
        canvas: null,

        centerDot: null,
        dots: [],
        staticDots : [],

        initialize: function(canvasSel) {
            this.canvas = canvasSel;

            this.centerDot = new Dot(0);
            this.centerDot.setColor(241, 241, 241);
        },

        addDrawCallback : function(func) {
            this.drawCallback.push(func);
        },

        getDimFunc: function() {
            return {
                width: this.processing.width,
                height: this.processing.height
            };
        },

        getCenterDotPosFunc : function(width, height) {
            return {
                "x" : width / 2,
                "y" : height / 2
            }
        },

        start: function() {
            this.procesingInstance = new Processing(
            this.canvas, this.setupProcessing.bind(this));
        },

        setupProcessing: function(p) {
            this.processing = p;

            var methods = new Hash(this).getKeys();

            // Override processing functions
            for(var i = 0; i < methods.length; i++) {
                if(!this.hasOwnProperty(methods[i]) && this[methods[i]] instanceof Function && methods[i].indexOf("$") != 0) {
                    //console.debug(methods[i]);
                    this.processing[methods[i]] = this[methods[i]].bind(this);
                }
            }
        },

        setup: function() {
            this.processing.background(0, 0, 0, 0);
        },

        setDimensionsFunction: function(getDimFunc) {
            this.getDimFunc = getDimFunc;
        },

        setCenterDotPosFunction : function(centerDotPosFunc) {
            this.getCenterDotPosFunc = centerDotPosFunc;
        },

        draw: function() {
            var dim = this.getDimFunc();
            this.processing.size(dim.width, dim.height);

            // determine center
            // var centerX = this.processing.width / 2,
            //     centerY = this.processing.height / 2;

            // Delete dots that have reached their destination
            var tmpDots = [];
            for(var i = 0; i < this.dots.length; i++) {
                if(!this.dots[i].atGoTo()) {
                    tmpDots.push(this.dots[i]);
                }
            }
            delete this.dots;
            this.dots = tmpDots;

            // Draw other dots
            for(var i = 0; i < this.dots.length; i++) {
                this.dots[i].draw(this.processing);
            }

            // Draw static dots
            for(var i = 0; i < this.staticDots.length; i++) {
                this.staticDots[i].draw(this.processing);
            }

            // Center dot
            var centerDotCoords = this.getCenterDotPosFunc(this.processing.width, this.processing.height);
            this.centerDot.setCoords(centerDotCoords.x, centerDotCoords.y);
            this.centerDot.setGoTo(centerDotCoords.x, centerDotCoords.y);
            this.centerDot.draw(this.processing);



            // Call draw fallbacks
            for (var i = this.drawCallback.length - 1; i >= 0; i--) {
                this.drawCallback[i](this);
            }
        },

        addDot : function(dot) {
            this.dots.push(dot);
        },

        addStaticDot : function(dot) {
            this.staticDots.push(dot);
        },

        mouseClicked: function(x, y) {
            
            x = (x === undefined) ? this.processing.mouseX : x;
            y = (y === undefined) ? this.processing.mouseY : y;

            var to = this.centerDot.getCoords();

            var createDots = this.processing.random(3, 20);
            for(var i = 0; i < createDots; i++) {
                this.addDot(this.createParticleDot(
                    x, y,
                    to.x, to.y));
            }
        },

        createParticleDot: function(atX, atY, toX, toY) {
            var forceDuration = this.processing.random(500, 1200);
            var force = new Force(
                this.processing.radians(this.processing.random(0, 360)), // Angle
                this.processing.random(30, 70), // Magnitude
                forceDuration, // Duration
                false);
            force.setAcceleration(this.processing.random(0.2, 0.5));

            var gravity = new Force(
            this.processing.radians(90), 100, 1000 * 60, true);
            gravity.setAcceleration(9);

            var centerForce = new AnchoredForce(
                toX, toY, // Anchor
                50, // Magnitude
                10, // Duration
                true);
            centerForce.setAcceleration(0.2);
            // centerForce.setAngleOffset(this.processing.random(0, Math.PI * 2), 0.92);
            // centerForce.setAngleOffset(Math.PI, 0.92);
            centerForce.setDelay(forceDuration * 0.2);

            var d = new Dot(this.processing.random(10, 30));
            d.setColor(this.dotColors[Math.round(this.processing.random(0, this.dotColors.length - 1))]);
            d.setCoords(atX, atY);
            d.addForce(force);
            d.addForce(gravity);
            d.setAnchoredForce(centerForce);
            d.setGoTo(toX, toY);

            return d;
        }

    });

    return Master;
});