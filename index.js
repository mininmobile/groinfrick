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
			case "-": memory[pointer]--; break;

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
					process.stdout.write((memory[pointer]).toString());
				}

				// we use process.stdout.write bc it doesn't write a new line,
				// so we have to remember that for ? and ! which do
				nnl = true;
			} break;

			// start null loop
			case "[": case "{": case "(": {
				// check if loop condition already met
				if (bracketexpr(c, memory[pointer])) {
					// store layers
					let l = 1;

					// skip over loop
					// if not on end loop char and on same layer
					while (!(input[i] == matchbracket(c) && l == 0)) {
						// increment position
						i++;

						// increment layer
						if (input[i] == c)
							l++;
						// decrement layer
						if (input[i] == matchbracket(c))
							l--;
					}
				} else {
					// add loopback position (position to jump back to if loop
					// still hasn't met condition)
					loopback.push(i);
				}
			} break;

			// loop ends
			case "]": case "}": case ")": {
				// check if condition hasn't been met
				if (bracketexpr(c, memory[pointer])) {
					// if it hasn't, jump back
					i = loopback[loopback.length - 1];
				} else {
					// if it has, remove loopback address
					loopback = loopback.filter((x, i) => i != loopback.length - 1);
				}
			} break;

			// ! echo pointer data (hex)
			// ? echo pointer position
			case "!": case "?": {
				// safety new line
				if (nnl)
					process.stdout.write("\n");
				nnl = false;

				// write pointer data as hexadecimal
				console.log(`0x${(c == "!" ? memory[pointer] : pointer).toString(16)}`);
			} break;

			// force exit
			case "*": i = input.length; break;
		}
	}

	// drop an extra new line
	if (nnl)
		process.stdout.write("\n");
}).catch((message) => {
	// eror :(
	console.error(message);
})

// get matching bracket
// b = bracket = [, ], {, }, (, )
// returns opposite of bracket
function matchbracket(b) {
	switch (b) {
		case "[": return "]";
		case "]": return "[";
		case "{": return "}";
		case "}": return "{";
		case "(": return ")";
		case ")": return "(";
	}
}

// get expression for bracket
// b = bracket = [, ], {, }, (, )
// mp = memory[pointer] = value of current memory slot
// returns expression result
function bracketexpr(b, mp) {
	switch (b) {
		case "[": return (mp <= 0);
		case "]": return (mp > 0);
		case "{": return (mp <= 32);
		case "}": return (mp > 32);
		case "(": return (mp > 127);
		case ")": return (mp <= 127);
	}
}
