package com.statewidesoftware.imagineblend.llama

val grammar = """
root ::= word (optional-spaces word)? (optional-spaces word)?

# Define a word as one or more uppercase letters
word ::= [A-Z]+

# Define optional spaces
optional-spaces ::= " "?
""".trimIndent()