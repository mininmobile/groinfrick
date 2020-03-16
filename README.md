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
