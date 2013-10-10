define(["lib/mootools-core"], function() {

	var Breakpoint = new Class({
		
		options : {},
		breakpoints : {},
		currentBreakpoint : null,
		lastWidth : 0,

		debug : function(msg) {
			if(console && console.debug) {
				console.debug(msg);
			}
		},

		initialize : function(opt) {
			this.options = Object.merge(this.options, opt);
		},

		addBreakpoint : function(name, enterWidth, exitWidth, enterFunc, exitFunc) {
			this.breakpoints[name] = {
				"enterWidth" : enterWidth,
				"exitWidth" : exitWidth, 
				"enterFunc" : typeOf(enterFunc) === "function" ? enterFunc : function() {},
				"exitFunc" : typeOf(exitFunc) === "function" ? exitFunc : function() {}
			};
		},

		_checkResize : function() {
			var curWidth = window.getSize().x;
	        var widthChange = curWidth - this.lastWidth
	        if(widthChange !== 0) {
	            // Find breakpoint
	            Object.each(this.breakpoints, function(item, index) {
	            	if(item.enterWidth <= curWidth && item.exitWidth >= curWidth) {
	            		if(this.currentBreakpoint !== index) {
	            			// Changed to new breakpoint
	            			if(this.breakpoints.hasOwnProperty(this.currentBreakpoint)) {
	            				this.debug("Exit: " + this.currentBreakpoint);
		            			this.breakpoints[this.currentBreakpoint].exitFunc.apply();
		            		}
		            		this.debug("Enter: " + index);
	            			item.enterFunc.apply();
	            		}
	            		this.currentBreakpoint = index;
	            	}
	            }.bind(this));
	        }
	        this.lastWidth += widthChange;
		},

		start : function() {
			this._checkResize();
			window.addEvent("resize", this._checkResize.bind(this));
		},

		stop : function() {
			window.removeEvent("resize", this._checkResize);
		}
	});

	return Breakpoint;
});