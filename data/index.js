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
    input = input.replace(/[a-z]/g, "")
    input = input.replace(/[0-9]/g, "")
    
    // Create Point Registry
    var pointers = [0];
    var pointer = -1;
    
    // Begin
    var output = "";
    for (let i = 0; i < input.length; i++) {
        if (pointer < 0) throw RangeError(`Pointer accounts to under 0\nCharacter: ${i+1}`).stack;
    }
    
    // Read Output
    output += input;
    console.log(input);
}).catch(console.error);