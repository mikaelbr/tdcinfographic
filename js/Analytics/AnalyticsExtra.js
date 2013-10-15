define(["Analytics/Analytics", "jquery"], function(_gaq, $) {

	$("document").on("click", "a", function(e) {
		var href = $(this).attr("href");

		// Mailto
		if(href.indexOf("mailto") === 0) {
			trackEvent("Email", "signup");
			return;
		}

		// Social media
		["twitter.com", "facebook.com"].each(function(media) {
			if(href.indexOf(media) !== -1) {
				trackEvent("Social", media);
			}
		});

		// External links (also catches social media)
		if(href.indexOf(window.location.hostname) === -1) {
			trackEvent("External", href);
		}
	});

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
	};
});