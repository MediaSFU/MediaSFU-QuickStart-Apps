plugins {
    id("com.android.application")
    kotlin("android")
    id("org.jetbrains.kotlin.plugin.compose")
}

fun envOrProperty(name: String): String {
    return (project.findProperty(name) as? String)
        ?: System.getenv(name)
        ?: ""
}

val connectMediaSFU = envOrProperty("MEDIASFU_CONNECT_MEDIASFU")
    .ifBlank { "true" }
    .lowercase()

android {
    namespace = "com.mediasfu.quickstart.kotlin"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.mediasfu.quickstart.kotlin"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

        buildConfigField("String", "MEDIASFU_API_USERNAME", "\"${envOrProperty("MEDIASFU_API_USERNAME")}\"")
        buildConfigField("String", "MEDIASFU_API_KEY", "\"${envOrProperty("MEDIASFU_API_KEY")}\"")
        buildConfigField("String", "MEDIASFU_LOCAL_LINK", "\"${envOrProperty("MEDIASFU_LOCAL_LINK")}\"")
        buildConfigField("boolean", "MEDIASFU_CONNECT_MEDIASFU", connectMediaSFU)
    }

    buildFeatures {
        buildConfig = true
        compose = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("com.mediasfu:mediasfu-sdk-android:1.0.3")
    implementation("com.mediasfu:mediasoup-client:1.0.2")
    implementation(platform("androidx.compose:compose-bom:2024.09.03"))
    implementation("androidx.activity:activity-compose:1.9.3")
    implementation("androidx.compose.material3:material3")
}
