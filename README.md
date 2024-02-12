# ImagineBlend

# Description 

This is a super cool game where you add together two words and get back a new word.
An LLM powers it. That's about all I have to say right now.

# Building

You need new-ish npm, Java 21, nodejs. You will also need to obtain "mistral-7b-instruct-v0.2.Q5_K_M.gguf" from HuggingFace
and put it in the ./models directory. See: https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF

Build front end:
```bash
$ npm i && npm run build
```

Build backend:
```bash
$ ./gradlew build
```

To run:
```bash
$ ./gradlew run
```

Then go to http://localhost:50123
