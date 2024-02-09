package com.statewidesoftware.imagineblend.llama

import com.github.michaelbull.result.Err
import com.github.michaelbull.result.Ok
import com.github.michaelbull.result.Result
import com.statewidesoftware.imagineblend.GenerationError
import com.statewidesoftware.imagineblend.WordAdder
import de.kherud.llama.InferenceParameters
import de.kherud.llama.ModelParameters
import mu.KotlinLogging
import java.util.*

fun String.myStrip(): String {
    return this.replace("\n", " ").replace("\r", " ").replace("\t", " ").replace("  ", " ").trim()
}


class LlamaWordAdder : WordAdder {

    private val rng = Random()

    private val logger = KotlinLogging.logger {}

    // need to do something smarter than this later... but for now, just to get it to compile
    private val modelParams: ModelParameters = ModelParameters().setNGpuLayers(10)
    private var inferParams: InferenceParameters = InferenceParameters()
        .setTemperature(0.7f)
        .setPenalizeNl(true)
        .setMirostat(InferenceParameters.MiroStat.V2)
        .setAntiPrompt("\n")

    // private val modelPath = "./models/zephyr-7b-beta.Q6_K.gguf"
    private val modelPath = "./models/mistral-7b-instruct-v0.2.Q5_K_M.gguf"
    private lateinit var model: de.kherud.llama.LlamaModel

    override fun addWords(word1: String, word2: String): Result<String, GenerationError> {
        val word1Upper = word1.uppercase(Locale.getDefault()).myStrip()
        val word2Upper = word2.uppercase(Locale.getDefault()).myStrip()
        logger.info { "Adding words: $word1Upper + $word2Upper..."}
        try {
            val prompt = PromptGenerator.generatePrompt(modelPath, word1Upper, word2Upper)
            // set new seed
            val randomizedSeed = rng.nextInt()
            inferParams.setSeed(randomizedSeed)
            // inferParams.setGrammar(grammar)
            val rawResult = model.generate(prompt, inferParams)
            // let's map this sucker to a string
            val allTogetherNow = rawResult.joinToString("")
            logger.debug { "Raw result: $allTogetherNow" }
            // search and replace underscores with spaces
            val result = allTogetherNow.replace("_", " ").uppercase(Locale.getDefault())
            logger.info { "$word1Upper + $word2Upper = $result" }
            return Ok(result)
        } catch (e: UnsupportedModelException) {
            logger.error { "Bad model! Error generating word: ${e.message}" }
            return Err(GenerationError("Error generating word: ${e.message}"))
        } catch (e: Exception) {
            logger.error { "Error generating word: ${e.message}" }
            return Err(GenerationError("Error generating word: ${e.message}"))
        }
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