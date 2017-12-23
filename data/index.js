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
    
    // Begin
    var output = "";
    for (let i = 0; i < input.length; i++) {
        if (pointer < 0) throw RangeError(`Pointer accounts to under 0\nCharacter: ${i+1}`).stack;
        let c = input[i];
        
        if (c == "+") { pointers[pointer] += 1; }
        if (c == ">") { pointer++; if (pointer == pointers.length) { pointers.push(0); } }
        if (c == "!") { output += getChar(pointers[pointer]) }
    }
    
    // Read Output
    console.log(output);
    console.log(input);
    console.log(pointers);
    console.log(pointer);
}).catch(console.error);

function getChar(p) {
    if (p == 0) return "null";
    else if (p > 1 && p <= 26) return "qwertyuiopasdfghjklzxcvbnm"[p];
    else if (p > 26) return p-26;
}