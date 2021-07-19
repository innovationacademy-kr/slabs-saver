package com.seoul42.saver_android

import android.content.Intent
import android.graphics.Bitmap
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import com.google.firebase.ktx.Firebase
import com.google.firebase.messaging.ktx.messaging

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