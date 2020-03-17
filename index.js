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

	// define memory
	let memory = [0];
	let pointer = 0;
	// pointer for input
	let ipointer = 0;
	// define all the loop backs and stuff
	let loopback = [];
	// no new line, to format ?, !, and . to play nicely with eachother
	let nnl = false;

	// loop
	for (let i = 0; i < input.length; i++) {
		// get character
		let c = input[i];

		// check if command
		switch (c) {
			// move pointer left
			case "<": {
				pointer--;

				// pointer index will never be <0
				if (pointer < 0)
					pointer = 0;
			} break;

			// move pointer right
			case ">": {
				pointer++;

				// allocate new memory slot
				if (memory[pointer] == undefined) {
					memory[pointer] = [];
				}
			} break;

			// increment pointer
			case "+": memory[pointer]++; break;
			// decrement pointer
			case "-": memory[pointer]++; break;

			// get next input char
			case ",": {
				// check if input still has chars
				if (args[ipointer]) {
					// write ascii char to pointer
					memory[pointer] = args[ipointer].charCodeAt();
					// increment input pointer
					ipointer++
				} else {
					// set pointer to zero
					memory[pointer] = 0;
				}
			} break;

			// echo pointer data (ascii)
			case ".": {
				if (memory[pointer] >= 0 && memory[pointer] < 128) {
					// if in ascii bounds, write ascii char
					process.stdout.write(String.fromCharCode(memory[pointer]));
				} else {
					// if not in ascii bounds, write number
					process.stdout.write(memory[pointer]);
				}

				// we use process.stdout.write bc it doesn't write a new line,
				// so we have to remember that for ? and ! which do
				nnl = true;
			} break;

			// echo pointer data (hex)
			case "!": {
				// safety new line
				if (nnl)
					process.stdout.write("\n");
				nnl = false;

				// write pointer data as hexadecimal
				console.log(`0x${memory[pointer].toString(16)}`);
			} break;

			// force exit
			case "*": i = input.length; break;
		}
	}
}).catch((message) => {
	// eror :(
	console.error(message);
}).then(() => {
	process.stdout.write("\r\n");
});
