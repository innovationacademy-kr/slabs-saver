package com.seoul42.saver_android

import android.util.Log
import android.webkit.JavascriptInterface
import com.google.firebase.ktx.Firebase
import com.google.firebase.messaging.ktx.messaging

class WebAppInterface  {
    @JavascriptInterface
  fun subscribeTopic(topic: String) {
        Firebase.messaging.subscribeToTopic(topic)
            .addOnCompleteListener { task ->
                var msg = ""
                msg = if (task.isSuccessful)
                    "$topic 성공"
                else
                    "$topic 실패"
                Log.d("구독", msg)
            }
    }
    @JavascriptInterface
    fun unsubscribeTopic(topic: String) {
        Firebase.messaging.unsubscribeFromTopic(topic)
            .addOnCompleteListener { task ->
                var msg = "성공"
                if (!task.isSuccessful) {
                    msg = "실패"
                }
                Log.d("구독 취소", msg)
            }

    }

}