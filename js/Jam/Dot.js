define(["Jam/Force", "Jam/NoForce", "Jam/MathUtils", "lib/mootools-core", "lib/processing"], function(Force, NoForce, MathUtils) {

    var Dot = new Class({
        
        // Settings
        
        // Props
        radius : 1,
        x : 0,
        y : 0,
        orgX : -1,
        orgY : -1,
        gotoX : 0,
        gotoY : 0,
        color : { r : 255, g : 255, b : 255 },

        forces : [],
        anchoredForce : null,

        currentRadius : 0,
        flexRadiusTo : -1,
        flexRadiusToAccel : 0,
        flexRadiusBackAccel : 0,
        
        initialize : function(r) {
            this.radius = r;
            this.currentRadius = this.radius;
            
            this.force = new NoForce();
        },
        
        setCoords : function(posX, posY) {
            this.x = posX;
            this.y = posY;
            
            if(this.orgX < 0) {
                this.orgX == this.x;
                this.orgY == this.y;
            }
        },

        getCoords : function() {
            return {
                x : this.x,
                y : this.y
            };
        },
        
        setGoTo : function(x, y) {
            this.gotoX = x;
            this.gotoY = y;
        },
        
        addForce : function(vector) {
            this.forces.push(vector);
        },

        setAnchoredForce : function(force) {
            this.anchoredForce = force;
        },

        setColor : function(r, g, b) {
            if(r.hasOwnProperty("r") && r.hasOwnProperty("g") && r.hasOwnProperty("b")) {
                g = r.g;
                b = r.b;
                r = r.r;
            }
            else if(r instanceof Array) {
                g = r[1];
                b = r[2];
                r = r[0];
            }
            this.color.r = r;
            this.color.g = g;
            this.color.b = b;
        },

        flexRadius : function(toRadius, toAccel, backAccel) {
            this.flexRadiusTo = toRadius;
            this.flexRadiusToAccel = toAccel;
            this.flexRadiusBackAccel = backAccel;
        },
        
        draw : function(processing) {
            
            // Calc new coords
            this._calcCoords(processing);
            
            processing.noStroke();
            processing.fill(this.color.r, this.color.g, this.color.b);
            processing.ellipseMode(processing.CENTER);
            processing.ellipse(this.x, this.y, this.currentRadius, this.currentRadius);
        },

        atGoTo : function() {
            var distance = MathUtils.distanceBetweenTwoPoints(this.x, this.y, this.gotoX, this.gotoY);
            if(distance <= 5) return true;

            // If all forces are finished, delete me
            var allForcesAreNull = true;
            if(this.anchoredForce != null) allForcesAreNull = false;
            for (var i = this.forces.length - 1; i >= 0; i--) {
                if(this.forces[i] != null) {
                    allForcesAreNull = false;
                }
            };
            return allForcesAreNull;
        },

        _calcRadius : function(processing) {
            if(this.toRadius <= 0) {
                return;
            }
        },
        
        _calcCoords : function(processing) {

            var calcForceAffectedCoords = function(force) {
                    var m = force.getCurrentMagnitude(processing, this);
                    var forceGotoCoords = MathUtils.coordsFromPointGivenAngleAndMagnitude(this.x, this.y, force.getAngle(), m);
                    return MathUtils.coordsOnLineBetweenTwoPoints(this.x, this.y, forceGotoCoords.x, forceGotoCoords.y, m * force.acceleration);
            }.bind(this);

            // Calc force effect
            var activeForces = 0;
            for (var i = this.forces.length - 1; i >= 0; i--) {
                var force = this.forces[i];
                if(force !== null) {
                    if(force.hasStarted() && !force.hasFinished()) {
                        var forceAffectedCoords = calcForceAffectedCoords(force);
                        this.setCoords(forceAffectedCoords.x, forceAffectedCoords.y);
                        activeForces++;
                    }
                    else if(force.hasFinished()) {
                        this.forces[i] = null;
                    }
                }
            }

            // Anchored force
            if(this.anchoredForce != null) {
                if(this.anchoredForce.hasStarted() && (activeForces > 0 || !this.anchoredForce.hasFinished())) {
                    // Anchor force cannot quit if active there still are active forces
                    this.anchoredForce.updateCoords(this.x, this.y);
                    var anchorAffectedCoords = calcForceAffectedCoords(this.anchoredForce);
                    this.setCoords(anchorAffectedCoords.x, anchorAffectedCoords.y);
                }
                else if(this.anchoredForce.hasFinished()) {
                    this.anchoredForce = null;
                }
            }
        }
        
    });

    return Dot;

});