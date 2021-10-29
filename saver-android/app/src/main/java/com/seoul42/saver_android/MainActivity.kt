package com.seoul42.saver_android

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.KeyEvent
import android.view.View
import android.view.animation.AnimationUtils
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ImageView
import android.widget.RelativeLayout
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.google.firebase.ktx.Firebase
import com.google.firebase.messaging.ktx.messaging
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {

    companion object {
        val BASE_URL = "https://thesaver.io/"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        startActivity(Intent(this, SplashScreenActivity::class.java))
        main_webView.apply {
            webViewClient = MyWebViewClient()
            settings.run {
                javaScriptEnabled = true
                settings.domStorageEnabled = true
                javaScriptCanOpenWindowsAutomatically = true
                setSupportMultipleWindows(false)
            }
            loadUrl(getStartUrl(intent))
        }

        swipe_refresh_layout.setOnRefreshListener {
            main_webView.reload()
            swipe_refresh_layout.isRefreshing = false
        }

        ivBack.setOnClickListener {
            main_webView.goBack()
            toggleTitleArea(getBackUrl())
        }

        ivSaver.setOnClickListener {
            main_webView.clearHistory()
            main_webView.loadUrl(BASE_URL)
            toggleTitleArea(BASE_URL)
        }
    }

    private fun getBackUrl(): String{
        val urlList = main_webView.copyBackForwardList()
        if(urlList.currentIndex > 0 && urlList.size > 1){
            return urlList.getItemAtIndex(urlList.currentIndex).url
        }
        return ""
    }

    private fun getStartUrl(intent: Intent): String {
        var url: String? = intent.getStringExtra("url")
        if (intent?.data != null)
            url = intent?.data.toString()
        url?.let {
            if (it.contains("kakaolink")) {
                Log.d("주소", BASE_URL + "${it.substring(it.indexOf('?') + 1, it.length)}");
                return BASE_URL + "${it.substring(it.indexOf('?') + 1, it.length)}"
            }
            return url
        }
        return BASE_URL
    }

    override fun onBackPressed() {
        if (main_webView.canGoBack()) {
            main_webView.goBack()
            toggleTitleArea(getBackUrl())
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

    inner class MyWebViewClient: WebViewClient() {
        override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
            request?.let {
                toggleTitleArea(it.url.toString())
            }
            return super.shouldOverrideUrlLoading(view, request)
        }
    }

    fun toggleTitleArea(url: String){
        Log.d("SAVER", "toggleTitleArea(${url})")
        if(url.isNullOrEmpty() || url.startsWith(BASE_URL)) {
            if(rlTitle.visibility == View.VISIBLE) {
                rlTitle.animation = AnimationUtils.loadAnimation (this@MainActivity, R.anim.top_out_short)
                rlTitle.animation.duration = 500
                rlTitle.visibility = View.GONE
            }
        }else{
            if(rlTitle.visibility == View.GONE) {
                rlTitle.animation = AnimationUtils.loadAnimation(this@MainActivity, R.anim.top_in_short)
                rlTitle.animation.duration = 500
                rlTitle.visibility = View.VISIBLE
            }
        }
    }
}