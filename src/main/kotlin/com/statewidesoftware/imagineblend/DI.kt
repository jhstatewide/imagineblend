package com.statewidesoftware.imagineblend
import io.javalin.http.sse.SseClient
import java.util.concurrent.CopyOnWriteArrayList

import org.kodein.di.DI
import org.kodein.di.bindSingleton

val di = DI {
    bindSingleton { EventBroadcaster() }
}

class EventBroadcaster {
    private val clients = CopyOnWriteArrayList<SseClient>()
    val logger = mu.KotlinLogging.logger {}

    fun addClient(client: SseClient) {
        clients += client
    }

    fun broadcast(message: String) {
        logger.info { "Broadcasting message: $message. Currently connected clients: ${clients.size}" }
        clients.forEach { it.sendEvent("message", message) }
    }

    fun removeClient(client: SseClient?) {
        clients.remove(client)
    }
}