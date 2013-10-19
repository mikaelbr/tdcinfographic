requirejs.config({
    paths : {
        "jquery" : "lib/jquery.min",
        'socketio': '../socket.io/socket.io',
        'raphael': 'lib/raphael',
        'underscore': 'lib/underscore',
        'bacon': 'lib/bacon',
    },
    shim : {
        'socketio': {
          exports: 'io'
        },
        'underscore': {
          exports: '_'
        },
        'bacon': ['jquery']
    }
});
require(["Analytics/AnalyticsExtra"]);