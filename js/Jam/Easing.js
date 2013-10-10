

define(["Jam/MathUtils"], function(MathUtils) {

    var Easing = {
        quadIn : function (t, b, c, d) {
            return c*t*t/(d*d) + b;
        },
        quadOut : function (t, b, c, d) {
            return -c*t*t/(d*d) + 2*c*t/d + b;
        },
        quadInOut : function(t, b, c, d) {
            if (t < d/2) return 2 * (Easing.quadIn(t, b, c, d) - b) + b;
            var ts = t - d/2;
            return 2*(Easing.quadOut(ts, b, c, d) - b) + c/2 + b;
        },
        speedInOut : function(t, b, c, d) {
            var x = t/d;
            console.debug(x);
            return (MathUtils.sinh((x - 0.5) * 5) + MathUtils.sinh(-(x - 0.5)) + (MathUtils.sinh(2.5) + Math.sin(-2.5))) / (MathUtils.sinh(2.5) * 1.82);
        }
    };


    return Easing;
});