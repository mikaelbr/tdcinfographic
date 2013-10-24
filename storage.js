var fs = require('fs');

var file = __dirname + '/total.json';

exports.read = function (cb) {
    fs.readFile(file, function (err, data) {
        var str = data.toString();
        if(err || !str || str.length < 0) {
            console.error(err || "No stored data");
            return;
        }

        var jsonData = JSON.parse(str);
        if (!jsonData.value) {
            return;
        }
        cb(jsonData)
    });
};

exports.write = function (total, cb) {
    fs.writeFile(file, JSON.stringify(total), cb);
};