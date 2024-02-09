package com.statewidesoftware.imagineblend.api

import com.statewidesoftware.imagineblend.api.controllers.WordController
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder
import io.javalin.apibuilder.ApiBuilder.get
import io.javalin.apibuilder.ApiBuilder.path
import io.javalin.http.staticfiles.Location
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
        config.registerPlugin(OpenApiPlugin { pluginConfig ->
            pluginConfig.withDefinitionConfiguration { version, definition ->
                definition.withOpenApiInfo { info: OpenApiInfo ->
                    info.title = "ImagineBlend API"
                }
            }
        })
        config.staticFiles.add { staticFiles ->
            staticFiles.hostedPath = "/"                    // change to host files on a subpath, like '/assets'
            staticFiles.directory = "public"               // the directory where your files are located
            staticFiles.location = Location.EXTERNAL       // Location.CLASSPATH (jar) or Location.EXTERNAL (file system)
            staticFiles.precompress = false                 // if the files should be pre-compressed and cached in memory (optimization)
            staticFiles.aliasCheck = null                   // you can configure this to enable symlinks (= ContextHandler.ApproveAliases())
        }
        config.registerPlugin(SwaggerPlugin())
        config.registerPlugin(ReDocPlugin())
        config.bundledPlugins.enableCors { cors ->
            cors.addRule {
                it.anyHost()
            }
        }
        config.router.apiBuilder {
            path("/words") {
                path("/add/{word1}/{word2}") {
                    // TODO: some caching I guess???
                    get(WordController::addWords)
                }
            }
        }
    }.start("0.0.0.0", 50123)

    logger.info { "Check out ReDoc docs at http://localhost:7002/redoc" }
    logger.info { "Check out Swagger UI docs at http://localhost:7002/swagger" }
}
