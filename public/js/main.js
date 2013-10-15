requirejs.config({
    paths : {
        "domReady" : "require/domReady",
        "jquery" : "lib/jquery.min"
    },
    shim : {
    }
});

require(["domReady!"], function(Breakpoint) {


});

require(["Analytics/AnalyticsExtra"]);