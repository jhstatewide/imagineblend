package com.statewidesoftware.imagineblend.llama

import com.github.michaelbull.result.Ok
import com.github.michaelbull.result.Result
import com.statewidesoftware.imagineblend.GenerationError
import com.statewidesoftware.imagineblend.WordAdder
import de.kherud.llama.InferenceParameters
import de.kherud.llama.ModelParameters
import mu.KotlinLogging
import java.util.*


class LlamaWordAdder : WordAdder {

    val logger = KotlinLogging.logger {}

    // need to do something smarter than this later... but for now, just to get it to compile
    val modelParams = ModelParameters().setNGpuLayers(10)
    var inferParams: InferenceParameters = InferenceParameters()
        .setTemperature(0.7f)
        .setPenalizeNl(true)
        .setMirostat(InferenceParameters.MiroStat.V2)
        .setAntiPrompt("\n")

    private val modelPath = "./models/zephyr-7b-beta.Q6_K.gguf"
    private lateinit var model: de.kherud.llama.LlamaModel

    override fun addWords(word1: String, word2: String): Result<String, GenerationError> {
        // we want to force the case of the words to uppercase
        val word1Upper = word1.uppercase(Locale.getDefault())
        val word2Upper = word2.uppercase(Locale.getDefault())
        val prompt = """
            You are AddBot. Your purpose is to add words together. You will get input like this:
            
            User: EARTH + WATER = ?
            
            You will reply with ONLY the answer, like this:
            
            AddBot: EARTH + WATER = MUD
            
            If you can't figure out the answer, make a logical guess, no matter what. Do not add any notes, disclaimers or parenthetical. Just give the answer. It should be one or two words maximum. NO EXPLANATION.
            
            User: $word1Upper + $word2Upper = ?
            AddBot: $word1Upper + $word2Upper =
        """.trimIndent()

        val rawResult = model.generate(prompt, inferParams)
        // let's map this sucker to a string
        val allTogetherNow = rawResult.joinToString("")
        logger.debug { "Raw result: $allTogetherNow" }
        return Ok(allTogetherNow)
    }

    init {
        initializeModel()
        logger.info { "Model initialized!" }
        logger.debug { "Debugging!" }
    }

    private fun initializeModel() {
        model = de.kherud.llama.LlamaModel(modelPath, modelParams)
    }

    // later we can periodically close the model to save RAM when its not generating...
    fun closeModel() {
        model.close()
    }

}