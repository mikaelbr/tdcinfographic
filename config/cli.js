
var path = process.platform == "linux" ? __dirname +'/../scale.py' : __dirname+'/../test.py';
module.exports = {
	cliPath: path
};