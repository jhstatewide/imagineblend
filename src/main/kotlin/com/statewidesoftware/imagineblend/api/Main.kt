package com.statewidesoftware.imagineblend.api

import com.statewidesoftware.imagineblend.api.controllers.WordController
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder
import io.javalin.apibuilder.ApiBuilder.get
import io.javalin.apibuilder.ApiBuilder.path
import io.javalin.openapi.OpenApiInfo
import io.javalin.openapi.plugin.OpenApiConfiguration
import io.javalin.openapi.plugin.OpenApiPlugin
import io.javalin.openapi.plugin.redoc.ReDocConfiguration
import io.javalin.openapi.plugin.redoc.ReDocPlugin
import io.javalin.openapi.plugin.swagger.SwaggerConfiguration
import io.javalin.openapi.plugin.swagger.SwaggerPlugin

fun main() {

    System.setProperty("org.slf4j.simpleLogger.defaultLogLevel", "TRACE")
    val logger = mu.KotlinLogging.logger {}

    Javalin.create { config ->

//        val openAPIConfig = OpenApiConfiguration().apply {
//            documentationPath = "/openapi"
//            info.title = "ImagineBlend API"
//        }

        config.registerPlugin(OpenApiPlugin { pluginConfig ->
            pluginConfig.withDefinitionConfiguration { version, definition ->
                definition.withOpenApiInfo { info: OpenApiInfo ->
                    info.title = "ImagineBlend API"
                }
            }
        })
        config.registerPlugin(SwaggerPlugin())
        config.registerPlugin(ReDocPlugin())
        config.router.apiBuilder {
            path("/words") {
                path("/add/{word1}/{word2}") {
                    get(WordController::addWords)
                }
            }
        }
    }.start(7002)

    logger.info { "Check out ReDoc docs at http://localhost:7002/redoc" }
    logger.info { "Check out Swagger UI docs at http://localhost:7002/swagger" }
}