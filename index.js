const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

// get input file
function getInputFile() {
	// if file path is specified in command, return it
	if (process.argv[2])
		return process.argv[2];

	// otherwise exit with error
	throw new Error("no script specified")
}

// get arguments
let args = process.argv[3] ? fs.readFileSync(process.argv[3]).toString() : "";
// launch interpreter
readFile(getInputFile()).then((data) => {
	// convert data to string
	let input = data.toString();

	// loop
	for (let i = 0; i < input.length; i++) {
		// get character
		let c = input[i];

		// check if command
		if ("<>+-,.[]!?*{}()".includes(c)) {
			// debug
			console.log(c);
		}
	}
}).catch((message) => {
	// eror :(
	console.error(message);
});
