define(["lib/mootools-core", "lib/mootools-more", "lib/handlebars"], function() {

/*
    var req = new Request.JSONP({
        url: 'http://graph.facebook.com/fql/?q=SELECT src_big, created, caption, like_info, link FROM photo WHERE aid IN ( SELECT aid  FROM album  WHERE owner = 294914173946009 and (type = "normal" or type = "wall")) ORDER BY created DESC',
        onSuccess : function(json) {
            var wall = new ThumbsWall();
            wall.setData(json["data"]);
            wall.setRowTemplate($("thumbrow").get("html"));
            wall.setWrapperElement($$(".thumbswrapper").pick());
            wall.setWallElement($$(".thumbs").pick());
            wall.setThumbDimensions(200, 200);
            wall.draw();
        }
    });
    req.send();
*/


    var ThumbsWall = function() {
        this.maxThumbsPerRow = 3;
        this.rowsStyle = {};
        this.thumbWidth = 0;
        this.thumbHeight = 0;
        this.rowsCount = 0;
        this.layoutMode;
    }

    ThumbsWall.prototype.supportsTransform = function() {
        var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');

        for(var i = 0; i < prefixes.length; i++) {
            if(document.createElement("div").style[prefixes[i]] !== undefined) {
                return true;
            }
        }

        return false;
    }

    ThumbsWall.prototype.setLayoutMode = function(mode) {
        if(mode === undefined) {
            mode = this.supportsTransform() ? "diamond" : "circle";
        }
        return this.layoutMode = mode;
    }

    ThumbsWall.prototype.getLayoutMode = function() {
        return (this.layoutMode === undefined)
            ? this.layoutMode = this.setLayoutMode()
            : this.layoutMode;
    }

    ThumbsWall.prototype.setThumbDimensions = function(width, height) {
        this.thumbWidth = width;
        this.thumbHeight = height;
    }

    ThumbsWall.prototype._getThumbDiagonal = function() {
        return Math.sqrt(Math.pow(this.thumbWidth, 2) + Math.pow(this.thumbHeight, 2)) + 1;
    }

    ThumbsWall.prototype.setWrapperElement = function(el) {
        this.wrapperEl = el;
    }

    ThumbsWall.prototype.setWallElement = function(el) {
        this.wallEl = el;
    }

    ThumbsWall.prototype._getStylePerRow = function(rowIndex) {
        rowIndex = parseInt(rowIndex);
        
        var prefix = ["-webkit-", "-moz-", "-ms-", "-o-", ""];
        
        var css = "";
        
        for(var i = 0; i < prefix.length; i++) {
            css += prefix[i] + "transform:translateY(" + (-1 * 58 * rowIndex) + "px);";
        }
        
        css += "z-index: " + (1000 - rowIndex + 1) + ";";
        
        for(var prop in this.rowsStyle) {
            if(this.rowsStyle.hasOwnProperty(prop)) {
                css += prop + ":" + this.rowsStyle[prop] + ";";
            }
        }
        
        return css;
    }

    ThumbsWall.prototype.setRowsStyle = function(prop, value) {
        this.rowsStyle[prop] = value;
    }

    ThumbsWall.prototype.setData = function(json) {
        this.data = json;
    }

    ThumbsWall.prototype.setMaxThumbsPerRow = function(num) {
        this.maxThumbsPerRow = num;
    }

    ThumbsWall.prototype.setRowTemplate = function(tmpl) {
        this.rowTemplate = Handlebars.compile(tmpl);
    }

    ThumbsWall.prototype.createHTML = function() {
        var rows = [{thumbs : []}];
        for(var key in this.data) {
            if(this.data.hasOwnProperty(key)) {
                if(rows[rows.length - 1]["thumbs"].length === (rows.length % 2 == 1 ? this.maxThumbsPerRow : this.maxThumbsPerRow - 1)) {
                    rows.push({ thumbs : new Array()});
                }
                
                if(this.data[key]["like_info"]["like_count"] == 0) {
                    this.data[key]["hide_likes"] = true;
                }

                // Pick an image size closest to thumb dimensions
                var bestImage = this.data[key]["images"][0];
                for(var i = 1; i < this.data[key]["images"].length; i++) {
                    var img = this.data[key]["images"][i];

                    // Skip if image too small
                    // Min size is twice as big as container size because of high density screens
                    if(img["width"] < this._getThumbDiagonal() || img["height"] < this._getThumbDiagonal()) continue;

                    if(img["width"] < bestImage["width"]) {
                        bestImage = img;
                    }
                }
                this.data[key]["thumb"] = bestImage;

                // Aspect
                // this.data[key]["aspect"] = bestImage["width"] / bestImage["height"] < 1 ? "portrait" : "landscape";

                rows[rows.length - 1]["thumbs"].push(this.data[key]);
            }
        }

        // If last row is incomplete, ignore it
        if(rows[rows.length - 1]["thumbs"].length !== (rows.length % 2 == 1 ? this.maxThumbsPerRow : this.maxThumbsPerRow - 1)) {
            rows.pop();
        }

        this.rowsCount = rows.length;
        
        var html = "";
        for(var i = 0; i < rows.length; i++) {
            rows[i]["css"] = this._getStylePerRow(i);
            html += this.rowTemplate(rows[i]);
        }
        
        return html;
    }


    ThumbsWall.prototype.draw = function() {
        var thumbWidth = this._getThumbDiagonal();
        var wallWidth = null;

        this.wallEl.addClass(this.getLayoutMode());

        this.drawerId = setInterval(function() {
            var nWallWidth = this.wrapperEl.getSize().x;
            if(nWallWidth != wallWidth) {
                wallWidth = nWallWidth;
                
                var maxThumbs = Math.floor(wallWidth / thumbWidth);
                this.setMaxThumbsPerRow(maxThumbs);
                
                //console.debug(wallWidth + "\t" + this.maxThumbsPerRow);
                
                this.wallEl.set("html", this.createHTML());
                
                this.wallEl.setStyle("width", (maxThumbs * thumbWidth) + "px");
                this.wallEl.setStyle("height", (this.rowsCount * thumbWidth * 0.5) + "px");
            }
        }.bind(this), 500);
    }


    ThumbsWall.prototype.stop = function() {
        clearInterval(this.drawerId);
    }

    return ThumbsWall;
});