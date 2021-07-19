package com.seoul42.saver_android

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val intent = Intent(this, SplashScreenActivity::class.java)
        startActivity(intent)

        val myWebView: WebView = findViewById(R.id.main_webView)

        //apply를 통해 myWebView.~~~ 의세팅을 블럭으로 해결
        myWebView.apply {
            webViewClient = WebViewClient()
            settings.javaScriptEnabled = true
        }
        myWebView.loadUrl("https://thesaver.io")
    }

    override fun onBackPressed() {

        val myWebView: WebView = findViewById(R.id.main_webView)

        if (myWebView.canGoBack()) {
            myWebView.goBack()
        }
        else {
            finish()
        }
    }
}