package com.statewidesoftware.imagineblend.api.controllers

import com.github.michaelbull.result.Err
import com.github.michaelbull.result.Ok
import com.statewidesoftware.imagineblend.WordAdder
import com.statewidesoftware.imagineblend.llama.LlamaWordAdder
import io.javalin.http.Context
import io.javalin.openapi.HttpMethod
import io.javalin.openapi.OpenApi
import io.javalin.openapi.OpenApiParam
import io.javalin.openapi.OpenApiResponse

object WordController {

    val wordAdder: WordAdder = LlamaWordAdder()
    val logger = mu.KotlinLogging.logger {}

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
        logger.debug {  "WE WERE CALLED!!!" }
        val word1 = ctx.pathParam("word1")
        val word2 = ctx.pathParam("word2")
        val resultAsString = when (val result = wordAdder.addWords(word1, word2)) {
            is Ok -> result.value
            is Err -> result.error.message
        }
        ctx.result(resultAsString)
    }
}