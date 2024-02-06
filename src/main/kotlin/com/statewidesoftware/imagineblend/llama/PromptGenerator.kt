package com.statewidesoftware.imagineblend.llama

class UnsupportedModelException(message: String) : Exception(message)

object PromptGenerator {
    @Throws(UnsupportedModelException::class)
    fun generatePrompt(model: String, word1: String, word2: String): String {
        if (model == "./models/zephyr-7b-beta.Q6_K.gguf") {
            return promptForZephyr(word1, word2)
        }
        if (model == "./models/mistral-7b-instruct-v0.2.Q5_K_M.gguf") {
            return promptForMistralInstruct(word1, word2)
        }
        throw UnsupportedModelException("Model $model is not supported")
    }

    private fun promptForMistralInstruct(word1: String, word2: String): String {
//        val prompt = """
//            <s>[INST] You are the core AI for 'ImagineBlend'. It is a game where users supply two ingredients, which are added together in a fanciful way and they can use the result of this mixture to make further things. It's a crafting game. The user will provide a prompt like: "WATER + EARTH = ?". You are to theorize about the result and reply with JUST the result. Assume that all things are possible, like FIRE + WATER. The results should be a single phrase, no explanation or anything else. Good answers: MUD, SAND, DIRT, PRETZELS. Bad answers: Mud (because it makes sense), Mud & Clay, Blah Blah...
//            WATER + EARTH = ?
//            [/INST]
//            MUD
//            [INST]FIRE + WATER = ?[/INST]
//            STEAM
//            [INST]$word1 + $word2 = ?[/INST]
//
//        """.trimIndent()
        val prompt = """
            [INST]
            <<SYS>>
            You are AddBot. You can add anything together. The answers must be either a dictionary word or a Wikipedia topic. You reply in only very terse answers. You only reply in 1 - 3 word answers.
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
}