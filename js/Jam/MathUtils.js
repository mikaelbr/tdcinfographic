
define(function() {
    var MathUtils = {
        distanceBetweenTwoPoints : function(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        },
        coordsOnLineBetweenTwoPoints : function(lineStartX, lineStartY, lineEndX, lineEndY, magnitude) {
            var angle = Math.atan2(lineEndY - lineStartY, lineEndX - lineStartX);
            return {
                x : (lineStartX + Math.cos(angle) * magnitude),
                y : (lineStartY + Math.sin(angle) * magnitude)
            };
        },
        coordsFromPointGivenAngleAndMagnitude : function(x, y, angle, magnitude) {
            var tmpX = x;
            var tmpY = y + magnitude;
            var tmpAngle = (Math.PI / 2) - angle;
            
            return MathUtils.rotateVector(x, y, tmpX, tmpY, tmpAngle);
        },
        rotateVector : function(x1, y1, x2, y2, angle) {
            var ca = Math.cos(angle);
            var sa = Math.sin(angle);
            
            var relativeX = x2 - x1;
            var relativeY = y2 - y1;
            
            var newX = relativeX * ca - relativeY * sa;
            var newY = relativeX * sa + relativeY * ca;

            return { x : x1 + newX, y : y1 + newY};
        },
        angleBetweenTwoVectors : function(v1x1, v1y1, v1x2, v1y2, v2x1, v2y1, v2x2, v2y2) {
            var v1dx = v1x2 - v1x1;
            var v1dy = v1y2 - v1y1;
            
            var v2dx = v2x2 - v2x1;
            var v2dy = v2y2 - v2y1;
            
            return Math.PI - (Math.atan2(v2dy, v2dx) - Math.atan2(v1dy, v1dx));
        },
        sinh : function(aValue) {
            var myTerm1 = Math.pow(Math.E, aValue);
            var myTerm2 = Math.pow(Math.E, -aValue);
            return (myTerm1-myTerm2)/2;
        },
        toDegrees : function(radians) {
            return radians * (180 / Math.PI);
        }
    };

    return MathUtils;
});