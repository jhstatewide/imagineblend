plugins {
    kotlin("jvm") version "1.9.22"
    kotlin("kapt") version "1.9.22"
}

group = "com.statewidesoftware"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation("org.jetbrains.kotlin:kotlin-test")
    implementation("de.kherud:llama:2.3.5")
    // we need some 'result' implementation
    implementation("com.michael-bull.kotlin-result:kotlin-result:1.1.18")
    // pull in javalin
    implementation("io.javalin:javalin-bundle:6.0.0")
    implementation("io.javalin.community.openapi:javalin-openapi-plugin:6.0.0")
    implementation("io.javalin.community.openapi:javalin-swagger-plugin:6.0.0")
    implementation("io.javalin.community.openapi:javalin-redoc-plugin:6.0.0")
    implementation("org.webjars.npm:redoc:2.0.0")
    implementation("org.webjars.npm:js-tokens:8.0.0")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.9.22")
    implementation("org.jetbrains.kotlin:kotlin-reflect:1.9.22")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-common:1.9.22")
    implementation("org.jetbrains.kotlin:kotlin-stdlib:1.9.22")
    implementation("com.squareup.okhttp3:okhttp:4.10.0")
    implementation("com.squareup.moshi:moshi-kotlin:1.14.0")
    implementation("com.squareup.moshi:moshi-adapters:1.14.0")

    // For Kotlin projects
    kapt("io.javalin.community.openapi:openapi-annotation-processor:6.0.0")

    // include kotlin micrologging
    implementation("io.github.microutils:kotlin-logging:3.0.5")
    // now pull in slf4j
    implementation("org.slf4j:slf4j-api:1.7.32")
    implementation("org.slf4j:slf4j-simple:1.7.32")
}

tasks.test {
    useJUnitPlatform()
}
kotlin {
    jvmToolchain(21)
}