package com.mediasfu.quickstart.kotlin

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.mediasfu.sdk.model.Credentials
import com.mediasfu.sdk.ui.mediasfu.MediasfuGeneric
import com.mediasfu.sdk.ui.mediasfu.MediasfuGenericOptions

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            val credentials = if (
                BuildConfig.MEDIASFU_API_USERNAME.isNotBlank() &&
                BuildConfig.MEDIASFU_API_KEY.isNotBlank()
            ) {
                Credentials(
                    apiUserName = BuildConfig.MEDIASFU_API_USERNAME,
                    apiKey = BuildConfig.MEDIASFU_API_KEY
                )
            } else {
                null
            }

            MediasfuGeneric(
                options = MediasfuGenericOptions(
                    credentials = credentials,
                    localLink = BuildConfig.MEDIASFU_LOCAL_LINK,
                    connectMediaSFU = BuildConfig.MEDIASFU_CONNECT_MEDIASFU
                )
            )
        }
    }
}
