requirejs.config({
	paths : {
		"domReady" : "require/domReady"
	},
	shim : {
		"lib/mootools-more" : ["lib/mootools-core"],
        "lib/MooHashChange" : ["lib/mootools-core"],
        "lib/diamonds/Diamonds" : ["lib/mootools-more"]
	}
});


require(["Breakpoint/Breakpoint", "domReady!"], function(Breakpoint) {
    var sk;


    var b = new Breakpoint();
    b.addBreakpoint("mobile", 0, 767,
        function() {
            // window.scrollTo(0, 0);
        },
        function() {
            
        }
    );
    b.addBreakpoint("tablet", 768, 1099,
        function() {
            // window.scrollTo(0, 0);
        },
        function() {
            
        }
    );
    b.addBreakpoint("desktop", 1100, 100000,
        function() {
            // window.scrollTo(0, 0);
            // Init skrollr
            require(["lib/skrollr/skrollr.min", "lib/skrollr/skrollr.menu.min", "domReady!"], function() {
                sk = skrollr.init();

                initSkrollrAnchors(sk);

                skrollr.menu.init(sk, {
                    animate: true,
                    easing: 'sqrt',
                    // //How long the animation should take in ms.
                    duration: function(currentTop, targetTop) {
                        return Math.abs(currentTop - targetTop) * 0.5;
                    }
                });
            });
        },
        function() {
        }
    );
    b.start();



    var isInteractiveElement = function(el) {
        return ["input", "textarea", "a", "button", "video"].contains(el.get("tag"));
    }

    var initSkrollrAnchors = function(sk) {
        var anchors = {
            "qualification-oslo" : 1500,
            "qualification-gothenburg" : 2800,
            "qualification-trondheim" : 4100,
            "final" : 5400,
            "price" : 7600
        };

        // Set on all data-menu-top matching anchors
        $$("a[href^=\"#\"][data-menu-top=\"\"]").each(function(item, index) {
            var anchor = item.get("href").split("#")[1];
            if(anchors.hasOwnProperty(anchor)) {
                item.set("data-menu-top", anchors[anchor]);
            }
        });

        // Listen to keyboard events
        var keyboardEventHandler = function(e) {
            // Do not mess with keyboard interactions in interactive elements
            if(isInteractiveElement(document.activeElement)) return;

            var curScroll = sk.getScrollTop();

            var scrolls = Object.values(anchors);

            // next
            if(e.key === "space" && !e.shift) {
                var i = 0;
                while(scrolls[i++] <= curScroll) {}
                i--;

                if(scrolls.hasOwnProperty(i) && curScroll > scrolls[i]) return;
                e.preventDefault();
                sk.setScrollTop(scrolls[i]);
            }
            // prev
            else if(e.key === "space" && e.shift) {
                var i = scrolls.length - 1;
                while(scrolls[i--] >= curScroll) {}
                i++;

                if(scrolls.hasOwnProperty(i) && curScroll < scrolls[i]) return;
                e.preventDefault();
                sk.setScrollTop(scrolls[i]);
            }
        };

        document.addEvent("keypress", keyboardEventHandler);
        // document.addEvent("keyup", keyboardEventHandler);
    }
});





require(["Jam/Master", "lib/mootools-core", "lib/mootools-more", "domReady!"],
function(Master) {

    var canvas = $("bekkuxjam");
    var jamwrap = canvas.getParent();


    // Master jam
    var dim = jamwrap.getSize();
	var m = new Master(canvas);
    
    m.setCenterDotPosFunction(function(width, height) {
        return {
            "x" : width / 2,
            "y" : height
        }
    });
    
    m.setDimensionsFunction(function() {
        var dim = jamwrap.getSize();
        return {
            width : dim.x,
            height : dim.y
        };
    });

    // Timeline
    // var t = new CupTimeline(jamwrap, labelswrap, m);
    // t.start();

	m.start();
});



// require(["ThumbsWall/Master", "lib/mootools-core", "lib/mootools-more"], function(ThumbsWall) {
//     var req = new Request.JSONP({
//         url: 'http://graph.facebook.com/fql/',
//         data: {
//             q: 'SELECT images, created, caption, like_info, link FROM photo WHERE aid IN ( SELECT aid FROM album  WHERE owner = 294914173946009 and (type = "normal" or type = "wall")) ORDER BY created DESC LIMIT 50'
//         },
//         onSuccess : function(json) {
//             var wall = new ThumbsWall();
//             wall.setData(json["data"]);
//             wall.setRowTemplate($("thumbrow").get("html"));
//             wall.setWrapperElement($$(".thumbswrapper").pick());
//             wall.setWallElement($$(".thumbs").pick());
//             wall.setThumbDimensions(200, 200);
//             wall.draw();
//             skrollr.refresh();
//         }
//     });
//     req.send();
// });



require(["Analytics/AnalyticsExtra"], function() {
});


// require(["lib/mootools-more", "domReady!"], function() {

//     var mySmoothScroll = new Fx.SmoothScroll({
//         links: 'a[href^="#"]',
//         duration : 500,
//         wheelStops: false
//     }, window);

// });