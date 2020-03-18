# groinfrick
brainfuck clone with extended feature set.

## philosophy
```
why use many word when few word do




do ✅
```

## usage
groinfrick uses the first file path provided as the code to be interpreted. (`node . program.txt`)

to specify input, specify a txt as the second argument. (`node . program.txt input.txt`)

## commands
### normal
few | do
--- | ---
`<` | move pointer left
`>` | move pointer right
`+` | increment pointer
`-` | decrement pointer
`,` | get next input char
`.` | echo pointer data (ascii)
`[` | jump to matching bracket if pointer is zero
`]` | jump back to matching bracket if pointer is nonzero
### extended
few | do
--- | ---
`!` | echo pointer data (hex)
`?` | echo pointer position
`*` | exit prematurely
`{` | jump to matching bracket if pointer is <=32
`}` | jump back to matching bracket if pointer is >32
`(` | jump to matching bracket is pointer is >127
`)` | jump back to matching bracket if pointer is <=127

## differences
here are a few notable differences from brainfuck (other than theextended
character set) that may be useful to groinfrick programmers

- files should end with the `.gf` extension and input files should end with the `.gfi` extension
- `[` actually checks for `<= 0`, not just `= 0`, and the equivalent goes for `]`.
- for end-of-lines stuff i just print `\n` and hope it works on all platforms
- when end of input file is reached, the cell is set to 0
- cell size is js type `number`, so practically infinite
- array size is unlimited, when you try to go left beyond the first cell the pointer is reset to the first cell.
