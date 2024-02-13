package com.statewidesoftware.imagineblend

import com.github.michaelbull.result.Result

class GenerationError(override val message: String) : Exception(message)

interface WordCombiner {
    fun addWords(word1: String, word2: String): Result<String, GenerationError>
    fun subtractWords(word1: String, word2: String): Result<String, GenerationError>
}