package com.statewidesoftware.imagineblend

import com.github.michaelbull.result.Result

class GenerationError(override val message: String) : Exception(message)

interface WordAdder {
    fun addWords(word1: String, word2: String): Result<String, GenerationError>
}