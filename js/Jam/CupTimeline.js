define(["Jam/Timeline", "lib/mootools-core", "lib/mootools-more"], function(Timeline) {
	
	var CupTimeline = new Class({

		jamwrap : null,
		labelswrap : null,
		master : null,

		timeline : null,
		labels : null,


		initialize : function(jamwrap, labelswrap, master) {
			this.jamwrap = jamwrap;
			this.labelswrap = labelswrap;
			this.master = master;

			this.timeline = new Timeline();
			this.labels = new Hash();

			master.addDrawCallback(this.timeline.draw.bind(this.timeline));

			this.addEvents();
		},

		start : function() {
			this.timeline.start();
		},

		addLabel : function(data, styles) {
            var label = new Element("a");
            label.addClass("school");
            label.addClass("label");
            label.addClass("event");
            label.set("href", data.href);
            label.setStyles(styles);

            // var html = '<span class="school">{school}</span>'
            // 	+ '<time class="time">{time}</time>'
            // 	+ '<span class="desc">{desc}</span>'
            // 	+ '<span class="location">{location}</span>';
            var html = '<span class="school">{school}</span>'
            	+ '<time class="teams">{teams}</time>';

            for(var k in data) {
            	if(data.hasOwnProperty(k)) {
            		html = html.replace("{" + k + "}", data[k]);
            	}
            }

            label.set("html", html);

            this.labelswrap.adopt(label);

            label.fade("hide");
            label.fade("in");

            return label;
    	},

    	dotsFromLabelToCenter : function(label, master, dots) {
	        var atCoords = label.getPosition(this.jamwrap);
	        var toCoords = master.centerDot.getCoords();

	        for(var i = 0; i < dots; i++) {
	            master.addDot(master.createParticleDot(atCoords.x, atCoords.y,
	                toCoords.x, toCoords.y));
	        }
	    },


	    addEvents : function() {
	    	var distanceFromEdgeX = "20%";
	    	var distanceFromEdgeY = "20%";

		    this.timeline.addEvent({
		        start : 1000,
		        func : function(master) {
		            // UiO
		            var data = {
		            	"href" : "#qualification-uioaho",
		            	"school" : "UiO",
		            	// "desc" : "Kvalifisering",
		            	// "time" : "6. nov",
		            	// "location" : "Vippetangen"
		            	"teams" : "4 lag"
		            };
		            var styles = {
		            	"bottom" : distanceFromEdgeY,
		            	"left" : distanceFromEdgeX
 		            };
		            var label = this.addLabel(data, styles);
		            this.labels.set("uio", label);
		            this.dotsFromLabelToCenter(label, this.master, 10);
		        }.bind(this)
		    });

		    this.timeline.addEvent({
		        start : 1200,
		        func : function(master) {
		            // AHO
		            var data = {
		            	"href" : "#qualification-uioaho",
		            	"school" : "AHO",
		            	// "desc" : "Kvalifisering",
		            	// "time" : "6. nov",
		            	// "location" : "Vippetangen"
		            	"teams" : "2 lag"
		            };
		            var styles = {
		            	"bottom" : distanceFromEdgeY,
		            	"right" : distanceFromEdgeX
 		            };
		            var label = this.addLabel(data, styles);
		            this.labels.set("aho", label);
		            this.dotsFromLabelToCenter(label, this.master, 5);
		        }.bind(this)
		    });

		    this.timeline.addEvent({
		        start : 2000,
		        func : function(master) {
		            // Chalmers
		            var data = {
		            	"href" : "#qualification-chalmers",
		            	"school" : "Chalmers",
		            	// "desc" : "Kvalifisering",
		            	// "time" : "7. nov",
		            	// "location" : "Cafè Bulten"
		            	"teams" : "9 lag"
		            };
		            var styles = {
		            	"top" : distanceFromEdgeY,
		            	"right" : distanceFromEdgeX
 		            };
		            var label = this.addLabel(data, styles);
		            this.labels.set("chalmers", label);
		            this.dotsFromLabelToCenter(label, this.master, 26);
		        }.bind(this)
		    });

		    this.timeline.addEvent({
		        start : 2800,
		        func : function(master) {
		            // NTNU
		            var data = {
		            	"href" : "#qualification-ntnu",
		            	"school" : "NTNU",
		            	// "desc" : "Kvalifisering",
		            	// "time" : "8. nov",
		            	// "location" : "Trondheim"
		            	"teams" : "9 lag"
		            };
		            var styles = {
		            	"top" : distanceFromEdgeY,
		            	"left" : distanceFromEdgeX
 		            };
		            var label = this.addLabel(data, styles);
		            this.labels.set("ntnu", label);
		            this.dotsFromLabelToCenter(label, this.master, 26);
		        }.bind(this)
		    });

		    this.timeline.addEvent({
		        start : 4000,
		        func : function(master) {
		            // NTNU
		            var data = {
		            	"href" : "#qualification-uioaho",
		            	"school" : "HiG",
		            	"teams" : "1 lag"
		            };
		            var styles = {
		            	"bottom" : "10%",
		            	"left" : "50%",
		            	"margin-left" : "-60px"
 		            };
		            var label = this.addLabel(data, styles);
		            this.labels.set("hig", label);
		            this.dotsFromLabelToCenter(label, this.master, 3);
		        }.bind(this)
		    });
	    }

	});

	return CupTimeline;
});

