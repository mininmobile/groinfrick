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
	// define last char received from io
	let inputindex = 0;
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

				if (pointer < 0)
					pointer = 0;
			} break;

			// move pointer right
			case ">": {
				pointer++;

				if (memory[pointer] == undefined) {
					memory[pointer] = [];
				}
			} break;

			// increment pointer
			case "+": memory[pointer]++; break;
			// decrement pointer
			case "-": memory[pointer]++; break;

			// echo pointer data (ascii)
			case ".": {
				if (memory[pointer] >= 0 && memory[pointer] < 128) {
					process.stdout.write(String.fromCharCode(memory[pointer]));
				} else {
					process.stdout.write(memory[pointer]);
				}

				nnl = true;
			} break;

			// echo pointer data (hex)
			case "!": {
				if (nnl)
					process.stdout.write("\n");

				nnl = false;
				console.log(`0x${memory[pointer].toString(16)}`);
			} break;

			// exit
			case "*": i = input.length; break;
		}
	}
}).catch((message) => {
	// eror :(
	console.error(message);
}).then(() => {
	process.stdout.write("\r\n");
});
