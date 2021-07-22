package com.seoul42.saver_android

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.google.firebase.ktx.Firebase
import com.google.firebase.messaging.ktx.messaging

class MainActivity : AppCompatActivity() {

    private val myWebView: WebView by lazy {
        findViewById(R.id.main_webView)
    }
    private val swipeRefreshLayout: SwipeRefreshLayout by lazy{
        findViewById(R.id.swipe_refresh_layout)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val data: Uri? = intent?.data
        var url: String? = intent.getStringExtra("url")
        if (data != null)
            url = data.toString()


        var intent = Intent(this, SplashScreenActivity::class.java)
        startActivity(intent)

        myWebView.apply {
            webViewClient = WebViewClient()
            settings.domStorageEnabled = true
            settings.javaScriptEnabled = true
        }
        myWebView.loadUrl("https://thesaver.io")
        url?.let {
            myWebView.loadUrl(url)
        }

        swipeRefreshLayout.setOnRefreshListener {
            myWebView.reload()
            swipeRefreshLayout.isRefreshing = false
        }
    }

    override fun onBackPressed() {
        if (myWebView.canGoBack()) {
            myWebView.goBack()
        } else {
            finish()
        }
    }

    private fun subscribeTopic(topic: String) {
        Firebase.messaging.subscribeToTopic(topic)
            .addOnCompleteListener { task ->
                var msg = ""
                msg = if (task.isSuccessful)
                    "성공"
                else
                    "실패"
                Log.d("구독", msg)
            }
    }

    private fun unsubscribeTopic(topic: String) {
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