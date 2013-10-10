define(["Analytics/Analytics", "lib/mootools-core", "lib/mootools-more", "lib/MooHashChange", "domReady!"], function(_gaq) {

	$$("a").each(function(a) {
		a.addEvent("click", function(e) {
			var href = a.get("href");
			var uri = href.toURI();

			// Mailto
			if(uri.get("scheme") === "mailto") {
				trackEvent("Email", "signup");
				return;
			}

			// Social media
			["twitter.com", "facebook.com"].each(function(media) {
				if(uri.get("host").contains(media)) {
					trackEvent("Social", media);
				}
			});

			// External links (also catches social media)
			if(uri.get("host") !== window.location.hostname) {
				trackEvent("External", uri.toString());
			}
			else if(!uri.get("fragment")) {
			// Internal links, except anchors: last years winners
				trackEvent("Internal", uri.toString());
			}
		});
	});

	// On in page anchor change
	window.addEvent("hashchange", function(e) {
		var url = ("" + window.location).toURI();
		trackEvent("Anchor", url.get("fragment"));
	});

	// Animation clicks
	$("bekkuxjam").addEvent("click", function(e) {
		trackEvent("Play", "balls");
	})


	var trackEvent = function(category, label) {
		try {
			window._gaq.push(['_trackEvent', category, 'click', label]);

			if(console && console.debug) {
				console.debug("Track event: " + category + ", click, " + label);
			}
		}
		catch (err) {
			console.err(err);
		}
	}
});