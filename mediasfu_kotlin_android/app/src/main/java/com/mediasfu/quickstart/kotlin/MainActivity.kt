package com.mediasfu.quickstart.kotlin

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.mediasfu.sdk.ui.mediasfu.MediasfuGeneric
import com.mediasfu.sdk.ui.mediasfu.MediasfuGenericOptions

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            MediasfuGeneric(
                options = MediasfuGenericOptions(
                    connectMediaSFU = true,
                    createMediaSFURoom = RoomBackend::create,
                    joinMediaSFURoom = RoomBackend::join
                )
            )
        }
    }
}
