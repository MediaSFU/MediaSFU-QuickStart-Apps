package com.mediasfu.quickstart.kotlin

import com.mediasfu.sdk.methods.utils.CreateJoinRoomError
import com.mediasfu.sdk.methods.utils.CreateJoinRoomResponse
import com.mediasfu.sdk.methods.utils.CreateJoinRoomResult
import com.mediasfu.sdk.methods.utils.CreateMediaSFUOptions
import com.mediasfu.sdk.methods.utils.JoinMediaSFUOptions
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URI
import java.net.URL

object RoomBackend {
    suspend fun create(options: CreateMediaSFUOptions) = post(
        "create",
        JSONObject().apply {
            put("action", options.payload.action)
            put("duration", options.payload.duration)
            put("capacity", options.payload.capacity)
            put("userName", options.payload.userName)
            options.payload.scheduledDate?.let { put("scheduledDate", it) }
            options.payload.secureCode?.let { put("secureCode", it) }
            options.payload.eventType?.let { put("eventType", it) }
            options.payload.roomName?.let { put("roomName", it) }
        }
    )

    suspend fun join(options: JoinMediaSFUOptions) = post(
        "join",
        JSONObject().apply {
            put("action", options.payload.action)
            put("meetingID", options.payload.meetingID)
            put("userName", options.payload.userName)
            options.payload.adminPasscode?.let { put("adminPasscode", it) }
            put("islevel", options.payload.islevel)
        }
    )

    private suspend fun post(operation: String, payload: JSONObject): CreateJoinRoomResult =
        withContext(Dispatchers.IO) {
            val base = URI(BuildConfig.MEDIASFU_BACKEND_BASE_URL)
            require(base.scheme == "https" && base.userInfo == null && base.query == null && base.fragment == null) {
                "Configure a plain HTTPS backend base URL."
            }
            val connection = URL("${base.toString().trimEnd('/')}/rooms/$operation")
                .openConnection() as HttpURLConnection
            try {
                connection.requestMethod = "POST"
                connection.setRequestProperty("Content-Type", "application/json")
                connection.doOutput = true
                connection.outputStream.bufferedWriter().use { it.write(payload.toString()) }
                val success = connection.responseCode in 200..299
                val stream = if (success) connection.inputStream else connection.errorStream
                val json = JSONObject(stream.bufferedReader().use { it.readText() })
                if (success) {
                    CreateJoinRoomResult(
                        success = true,
                        data = CreateJoinRoomResponse(
                            message = json.getString("message"),
                            roomName = json.getString("roomName"),
                            secureCode = json.optString("secureCode").ifBlank { null },
                            publicURL = json.getString("publicURL"),
                            link = json.getString("link"),
                            secret = json.getString("secret"),
                            success = true
                        )
                    )
                } else {
                    CreateJoinRoomResult(
                        data = CreateJoinRoomError(json.optString("error", "Room request failed"), false),
                        success = false
                    )
                }
            } finally {
                connection.disconnect()
            }
        }
}
