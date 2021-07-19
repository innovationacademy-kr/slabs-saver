package com.seoul42.saver_android

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : AppCompatActivity() {

   private val myWebView: WebView by lazy{
        findViewById(R.id.main_webView)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val intent = Intent(this, SplashScreenActivity::class.java)
        startActivity(intent)

        myWebView.apply {
            webViewClient = WebViewClient()
            settings.domStorageEnabled =true
            settings.javaScriptEnabled = true
        }
        myWebView.loadUrl("https://thesaver.io")
    }

    override fun onBackPressed() {
        if (myWebView.canGoBack()) {
            myWebView.goBack()
        }
        else {
            finish()
        }
    }

}