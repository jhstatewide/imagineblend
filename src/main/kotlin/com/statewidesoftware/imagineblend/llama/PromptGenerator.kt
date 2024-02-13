package com.statewidesoftware.imagineblend.llama

class UnsupportedModelException(message: String) : Exception(message)

enum class WordOperator {
    ADD,
    SUBTRACT
}

object PromptGenerator {

    @Throws(UnsupportedModelException::class)
    fun generateMultiModePrompt(model: String, word1: String, word2: String, operator: WordOperator): String {
        if (operator == WordOperator.ADD) {
            return genericPrompt(model, operator, word1, word2)
        }
        throw UnsupportedModelException("Model $model is not supported")
    }

    private fun genericPrompt(model: String, operator: WordOperator, word1: String, word2: String): String {
        val stringForOperator = when (operator) {
            WordOperator.ADD -> "+"
            WordOperator.SUBTRACT -> "-"
        }

        return """
            [INST]
            <<SYS>>
            You are CalcBot, equipped to perform both additive (+) and subtractive (-) combinations. Your responses must align with dictionary words or Wikipedia topics, delivered with wit and whimsy in very concise form, ranging from 1 to 3 words.
            <</SYS>>
            Engage with these logic puzzles.[/INST]
            WATER + EARTH = ?
            MUD
            FIRE + WATER = ?
            STEAM
            ICE + WIND = ?
            BLIZZARD
            DAY - NIGHT = ?
            LIGHT
            SUMMER - WINTER = ?
            WARMTH
            $word1 $stringForOperator $word2 = ?
        """.trimIndent()
    }

    @Throws(UnsupportedModelException::class)
    fun generateAddPrompt(model: String, word1: String, word2: String): String {
        if (model == "./models/zephyr-7b-beta.Q6_K.gguf") {
            return promptForZephyr(word1, word2)
        }
        if (model == "./models/mistral-7b-instruct-v0.2.Q5_K_M.gguf") {
            return promptForMistralInstructAdd(word1, word2)
        }
        throw UnsupportedModelException("Model $model is not supported")
    }

    private fun promptForMistralInstructAdd(word1: String, word2: String): String {
        val prompt = """
            [INST]
            <<SYS>>
            You are AddBot. You can add anything together. The answers must be either a dictionary word or a Wikipedia topic and be witty and whimsical. You reply in only very terse answers. You only reply in 1 - 3 word answers.
            <</SYS>>
            Solve these simple logic puzzles.[/INST]
            WATER + EARTH = ?
            MUD
            FIRE + WATER = ?
            STEAM
            ICE + WIND = ?
            BLIZZARD
            $word1 + $word2 = ?
            
        """.trimIndent()
        return prompt
    }

    private fun promptForZephyr(word1: String, word2: String): String {
        val prompt = """
                You are AddBot. Your purpose is to add words together in the context of a fun 'alchemy' game. You will get input like this:
                
                User: EARTH + WATER = ?
                
                You will reply with ONLY the answer, like this:
                
                AddBot: EARTH + WATER = MUD
                
                If you can't figure out the answer, make a logical or fanciful guess, no matter what. Do not add any notes, disclaimers or parenthetical. Just give the answer. It should be one or two words maximum. NO EXPLANATION. Do not reply with underscores either.
                
                User: $word1 + $word2 = ?
                AddBot: $word1 + $word2 =
            """.trimIndent()
        return prompt
    }

    // let's work similarly to the mistral add prompt, except it's the logical inverse
    fun generateSubtractPrompt(modelPath: String, word1Upper: String, word2Upper: String): String? {
        if (modelPath == "./models/zephyr-7b-beta.Q6_K.gguf") {
            return promptForZephyrSubtract(word1Upper, word2Upper)
        }
        if (modelPath == "./models/mistral-7b-instruct-v0.2.Q5_K_M.gguf") {
            return promptForMistralInstructSubtract(word1Upper, word2Upper)
        }
        return null
    }

    private fun promptForMistralInstructSubtract(word1Upper: String, word2Upper: String): String? {
        return """
            [INST]
            <<SYS>>
            You are SubtractBot. You can subtract anything together. The answers must be either a dictionary word or a Wikipedia topic and be witty and whimsical. You reply in only very terse answers. You only reply in 1 - 3 word answers.
            <</SYS>>
            Solve these simple logic puzzles.[/INST]
            WATER - EARTH = ?
            WAVES
            FIRE - WATER = ?
            ASH
            ICE - WIND = ?
            MELT
            $word1Upper - $word2Upper = ?
            
        """.trimIndent()
    }

    private fun promptForZephyrSubtract(word1Upper: String, word2Upper: String): String? {
        return """
            You are SubtractBot. Your purpose is to subtract words together in the context of a fun 'alchemy' game. You will get input like this:
            
            User: EARTH - WATER = ?
            
            You will reply with ONLY the answer, like this:
            
            SubtractBot: EARTH - WATER = MUD
            
            If you can't figure out the answer, make a logical or fanciful guess, no matter what. Do not add any notes, disclaimers or parenthetical. Just give the answer. It should be one or two words maximum. NO EXPLANATION. Do not reply with underscores either.
            
            User: $word1Upper - $word2Upper = ?
            SubtractBot: $word1Upper - $word2Upper =
        """.trimIndent()
    }
}