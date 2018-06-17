// Import dependencies
const fs = require("fs"),
	  util = require("util");

// Make readFile() function
const readFile = util.promisify(fs.readFile);

// Asyncify
async function getInput(file) {
  return await readFile(file);
}

// Get Input File
function getInputFile() {
	if (process.argv[2]) return process.argv[2];
	
	return "input.txt";
}

// Get Arguments
var args = fs.readFileSync("input args.txt").toString();
// Launch Interpreter
getInput(getInputFile()).then((data) => {
	// Convert data to string
	var input = data.toString();

	// Lex Input
	input = input.replace(" ", "");
	input = input.replace(/\r?\n|\r/g, "");
	input = input.replace(/[a-z]/gi, "");
	input = input.replace(/[0-9]/g, "");
	// Lex Arguments
	args = args.replace(/\r?\n|\r/g, "");
	
	// Create Point Registry
	var pointers = [0];
	var pointer = 0;
	var jumpPoint = [];

	// Create Output Stream
	var output = "";
	
	// Parser
	for (let i = 0; i < input.length; i++) {
		// Get Error Character
		let e = input[i-1];
		let errorDat = `\n    at Position: ${i}, Character: '${e}'\n    at File: ${getInputFile()}`;

		// Error Handler
		if (pointer < 0) throw new Error(`Pointer accounts to under 0${errorDat}`);
		if (pointers[pointer] < 0) throw new Error(`Pointer data is not an existing data type${errorDat}`);

		// Get Character
		let c = input[i];

		//#region Command Parser
			 if (c == "+") { pointers[pointer] += 1; }
		else if (c == "-") { pointers[pointer] -= 1; }
		else if (c == ">") { pointer++; if (pointer == pointers.length) { pointers.push(0); } }
		else if (c == "<") { pointer--; }
		else if (c == "!") { output += toChar(pointers[pointer]); }
		else if (c == "?") { output += pointer.toString(); }
		else if (c == "[") { jumpPoint.push(i); }
		else if (c == "]") { if (pointers[pointer] != 0) { i = jumpPoint[jumpPoint.length - 1] - 1; jumpPoint.pop(); } }
		else if (c == "{") { jumpPoint.push(i); }
		else if (c == "}") { if (pointers[pointer] == 0 || pointers[pointer] > 25) { i = jumpPoint[jumpPoint.length - 1] - 1; jumpPoint.pop(); } }
		else if (c == "(") { jumpPoint.push(i); }
		else if (c == ")") { if (pointers[pointer] < 26) { i = jumpPoint[jumpPoint.length - 1] - 1; jumpPoint.pop(); } }
		else if (c == "^") { pointers[pointer] = toPoint(args[pointer]); }
		else if (c == "*") { break }
		//#endregion
	}

	if (output == "")
		console.log("Script exitted without any output");
	else
		console.log(output);
}).catch((message) => {
	// When the an error, who you gonna call?
	// ERROR BUSTERS!
	console.error(message);
});

// Convert Point to Char
function toChar(p) {
	if (p == 0) return "null";
	else if (p > 0 && p <= 26) return "qwertyuiopasdfghjklzxcvbnm"[p - 1];
	else if (p > 25) return (p-27).toString();
}

// Convert Char to Point
function toPoint(p) {
	if (p == " ") return 0;
	else if (p == null) return 0;
	else if (p == undefined) return 0;
	else if (/[a-z]/.test(p)) return "qwertyuiopasdfghjklzxcvbnm".indexOf(p) + 1;
	else if (/[0-9]/.test(p)) return parseInt(p)+27;
}