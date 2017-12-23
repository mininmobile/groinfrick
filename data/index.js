// Import dependencies
const fs = require("fs"),
      util = require("util");

// Make readFile() function
const readFile = util.promisify(fs.readFile);

// Async boi
async function getInput(file) {
  return await readFile(file);
}

// Get Arguments
var args = fs.readFileSync("input args.txt").toString();
// Load Main Boi
getInput("input.txt").then((data) => {
    // Convert data to string
    var input = data.toString();

    // p u r i f y
    input = input.replace(" ", "");
    input = input.replace(/\r?\n|\r/g, "");
    input = input.replace(/[a-z]/gi, "")
    input = input.replace(/[0-9]/g, "")

    args = args.replace(/\r?\n|\r/g, "");
    
    // Create Point Registry
    var pointers = [0];
    var pointer = 0;
    var jumpPoint = 0;
    
    // Begin
    var output = "";
    for (let i = 0; i < input.length; i++) {
        // Get Error Character
        let e = input[i-1];
        let errorDat = `\n      Position: ${i}\n      Character: ${e}`;

        // Error Handler
        if (pointer < 0) throw RangeError(`Pointer accounts to under 0${errorDat}`);
        if (pointers[pointer] < 0) throw TypeError(`Pointer data is not an existing data type${errorDat}`);

        // Get Character
        let c = input[i];

        //#region Command Parser
        if (c == "+") { pointers[pointer] += 1; }
        if (c == "-") { pointers[pointer] -= 1; }
        if (c == ">") { pointer++; if (pointer == pointers.length) { pointers.push(0); } }
        if (c == "<") { pointer--; }
        if (c == "!") { output += getChar(pointers[pointer]); }
        if (c == "?") { output += pointer.toString(); }
        if (c == "[") { jumpPoint = i; }
        if (c == "]") { if (pointers[pointer] != 0) { i = jumpPoint; } }
        if (c == "{") { jumpPoint = i; }
        if (c == "}") { if (pointers[pointer] == 0 || pointers[pointer] > 25) { i = jumpPoint; } }
        if (c == "(") { jumpPoint = i; }
        if (c == ")") { if (pointers[pointer] < 26) { i = jumpPoint; } }
        if (c == "^") { pointers[pointer] = toPoint(args[pointer]); }
        if (c == "*") { break }
        //#endregion
    }
    
    // Read Output
    console.log(output);
}).catch((message) => {
    // When the an error, who you gonna call?
    // ERROR BUSTERS!
    console.error(message)
});

// Convert Point to Char
function getChar(p) {
    if (p == 0) return "null";
    else if (p > 0 && p <= 25) return "qwertyuiopasdfghjklzxcvbnm"[p];
    else if (p > 25) return (p-26).toString();
}

// Convert Char to Point
function toPoint(p) {
    if (p == " ") return 0;
    else if (/[a-z]/.test(p)) return "qwertyuiopasdfghjklzxcvbnm".indexOf(p);
    else if (/[0-9]/.test(p)) return parseInt(p)+26;
}