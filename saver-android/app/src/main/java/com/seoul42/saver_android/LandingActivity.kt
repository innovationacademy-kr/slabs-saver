package com.seoul42.saver_android

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler

class LandingActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_landing)
        startLoading()
    }

    private fun startLoading(){
        val handler = Handler()
        handler.postDelayed({finish()}, 2500)
    }
}