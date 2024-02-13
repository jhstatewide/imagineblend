package com.statewidesoftware.imagineblend.api.controllers

import com.github.michaelbull.result.Err
import com.github.michaelbull.result.Ok
import com.statewidesoftware.imagineblend.EventBroadcaster
import com.statewidesoftware.imagineblend.WordCombiner
import com.statewidesoftware.imagineblend.di
import com.statewidesoftware.imagineblend.llama.LlamaWordCombiner
import io.javalin.http.Context
import io.javalin.openapi.HttpMethod
import io.javalin.openapi.OpenApi
import io.javalin.openapi.OpenApiParam
import io.javalin.openapi.OpenApiResponse
import org.kodein.di.instance

object WordController {

    private val wordCombiner: WordCombiner = LlamaWordCombiner()
    private val logger = mu.KotlinLogging.logger {}

    private val eventBroadcaster : EventBroadcaster by di.instance<EventBroadcaster>()

    @OpenApi(
        summary = "Generate a word from two words",
        description = "This endpoint takes two words and generates a new word from them",
        tags = ["Words"],
        pathParams = [
            OpenApiParam(name = "word1", description = "The first word"),
            OpenApiParam(name = "word2", description = "The second word")
        ],
        methods = [HttpMethod.GET],
        responses = [
            OpenApiResponse(status = "200", description = "The generated word"),
            OpenApiResponse(status = "400", description = "An error occurred")
        ],
        path = "/words/add/{word1}/{word2}"
    )
    // TODO: i thought about this a lot and i think a LRU cache would work particularly well here
    fun addWords(ctx: Context) {
        val word1 = ctx.pathParam("word1")
        val word2 = ctx.pathParam("word2")
        synchronized(wordCombiner) {
            // retry up to 3 times...
            repeat(3) {
                logger.info { "Generating word from $word1 and $word2!" }
                when (val result = wordCombiner.addWords(word1, word2)) {
                    is Ok -> {
                        if (acceptableAnswer(result.value)) {
                            eventBroadcaster.broadcast("$word1 + $word2 = ${result.value}")
                            ctx.result(result.value)
                            return
                        } else {
                            logger.error { "Invalid word generated: ${result.value}" }
                            logger.error { "This was attempted $it times" }
                        }
                    }
                    is Err -> {
                        eventBroadcaster.broadcast("$word1 + $word2 = ERROR!");
                        logger.error { "Error generating word: ${result.error.message}" }
                    }
                }
            }

           ctx.status(500)
           ctx.result("Error generating word!")
        }
    }

    @OpenApi(
    summary = "Subtract one word from another",
    description = "This endpoint takes two words and subtracts the second word from the first",
    tags = ["Words"],
    pathParams = [
        OpenApiParam(name = "word1", description = "The first word"),
        OpenApiParam(name = "word2", description = "The second word")
    ],
    methods = [HttpMethod.GET],
    responses = [
        OpenApiResponse(status = "200", description = "The result of the subtraction"),
        OpenApiResponse(status = "400", description = "An error occurred")
    ],
    path = "/words/subtract/{word1}/{word2}"
)
fun subtractWords(ctx: Context) {
    val word1 = ctx.pathParam("word1")
    val word2 = ctx.pathParam("word2")
    synchronized(wordCombiner) {
        // retry up to 3 times...
        repeat(3) {
            logger.info { "Subtracting $word2 from $word1!" }
            when (val result = wordCombiner.subtractWords(word1, word2)) {
                is Ok -> {
                    if (acceptableAnswer(result.value)) {
                        eventBroadcaster.broadcast("$word1 - $word2 = ${result.value}")
                        ctx.result(result.value)
                        return
                    } else {
                        logger.error { "Invalid word generated: ${result.value}" }
                        logger.error { "This was attempted $it times" }
                    }
                }
                is Err -> {
                    eventBroadcaster.broadcast("$word1 - $word2 = ERROR!")
                    logger.error { "Error generating word: ${result.error.message}" }
                }
            }
        }

       ctx.status(500)
       ctx.result("Error generating word!")
    }
}

    private fun acceptableAnswer(answer: String): Boolean {
        return answer.matches(Regex("[A-Z '-]+"))
    }
}