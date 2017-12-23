const fs = require("fs"),
      util = require("util");

const readFile = util.promisify(fs.readFile);

async function getInput(file) {
  return await readFile(file);
}

// Simplify Input
getInput("input.txt").then((data) => {
    // Convert data to string
    input = data.toString();

    // p u r i f y
    input = input.replace(" ", "");
    input = input.replace(/\r?\n|\r/g, "");
    input = input.replace(/[a-z]/gi, "")
    input = input.replace(/[0-9]/g, "")
    
    // Create Point Registry
    var pointers = [0];
    var pointer = 0;
    var jumpPoint = 0;
    
    // Begin
    var output = "";
    for (let i = 0; i < input.length; i++) {
        if (pointer < 0) throw RangeError(`Pointer accounts to under 0\nCharacter: ${i+1}`).stack;
        let c = input[i];
        
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
        if (c == "*") { break }
    }
    
    // Read Output
    console.log(output);
}).catch(console.error);

function getChar(p) {
    if (p == 0) return "null";
    else if (p > 0 && p <= 25) return "qwertyuiopasdfghjklzxcvbnm"[p];
    else if (p > 25) return (p-26).toString();
}