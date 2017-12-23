# groinfrick
Totally not a Brainfuck clone.

# Commands

Command | Purpose
--- | --
`^` | Set current pointer to corrosponding argument point
`?` | Echo current pointer
`!` | Echo current pointer's data
`*` | Exit prematurely
`+` | Add 1 to pointer selected
`-` | Remove 1 from pointer selected
`>` | Move to right pointer
`<` | Move to left pointer

Loop | Process
--- | ---
`[`, `]` | While current pointer is *not* null
`{`, `}` | While current pointer is *not* string
`(`, `)` | While current pointer is *not* int

# Data Types
## Strings
From 1 to 26 in the QWERTY alphabet.

## Integers
From 26 to infinity - so `27 == 0`, `28 == 1`, `29 == 2`, etc.

## Null
When the pointer data is equal or lower than 0.