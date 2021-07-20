package com.seoul42.saver_android

import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler

class SplashScreenActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window?.statusBarColor = getColor(R.color.blue);
        }
        setContentView(R.layout.activity_splash)
        startLoading()
    }

    private fun startLoading(){
        val handler = Handler()
        handler.postDelayed({finish()}, 2000)
    }
}