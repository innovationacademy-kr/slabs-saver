package com.seoul42.saver_android

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.os.Message
import android.util.Log
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout

class MainActivity : AppCompatActivity() {

    private val myWebView: WebView by lazy {
        findViewById(R.id.main_webView)
    }
    private val swipeRefreshLayout: SwipeRefreshLayout by lazy {
        findViewById(R.id.swipe_refresh_layout)
    }
    private val constraintLayout: ConstraintLayout by lazy {
        findViewById(R.id.constraint_layout)
    }

    private var childView: WebView? = null

    private val childWebClient: MyWebClient by lazy {
        MyWebClient(this@MainActivity, packageManager)
    }

    private val baseUrl = "http://thesaver.io/";

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        startActivity(Intent(this, SplashScreenActivity::class.java))

        myWebView.apply {
            webViewClient = MyWebClient(this@MainActivity, packageManager)
            webChromeClient = MyWebChromeClient()
            addJavascriptInterface(WebAppInterface(), "Android")
            settings.run {
                javaScriptEnabled = true
                settings.domStorageEnabled = true
                javaScriptCanOpenWindowsAutomatically = true
                setSupportMultipleWindows(true)
            }
            loadUrl(getStartUrl(intent))
        }

        swipeRefreshLayout.setOnRefreshListener {
            myWebView.reload()
            swipeRefreshLayout.isRefreshing = false
        }
    }

    private fun getStartUrl(intent: Intent): String {
        var url: String? = intent.getStringExtra("url")

        if (intent?.data != null)
            url = intent?.data.toString()
        url?.let {
            if (it.contains("kakaolink")) {
                Log.d("주소", baseUrl + it.substring(it.indexOf('?') + 1, it.length));
                return baseUrl + it.substring(it.indexOf('?') + 1, it.length)
            }
            return url
        }
        return baseUrl
    }


    override fun onBackPressed() {
        when {
            myWebView.canGoBack() -> {
                myWebView.goBack()
            }
            myWebView.url != baseUrl -> {
                myWebView.clearHistory()
                myWebView.loadUrl(baseUrl)
            }
            else -> {
                finish()
            }
        }
    }



    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        childWebClient.getCallbackManager()?.onActivityResult(requestCode,resultCode,data)
        super.onActivityResult(requestCode, resultCode, data)
    }

    inner class MyWebChromeClient() : android.webkit.WebChromeClient() {

        /// ---------- 팝업 열기 ----------
        /// - 카카오 JavaScript SDK의 로그인 기능은 popup을 이용합니다.
        /// - window.open() 호출 시 별도 팝업 webview가 생성되어야 합니다.
        override fun onCreateWindow(
            view: WebView,
            isDialog: Boolean,
            isUserGesture: Boolean,
            resultMsg: Message
        ): Boolean {

            childView = WebView(view.context)

            // 부모 웹뷰와 동일하게 웹뷰 설정
            childView?.run {
                settings.run {
                    javaScriptEnabled = true
                    javaScriptCanOpenWindowsAutomatically = true
                    setSupportMultipleWindows(true)
                }
                layoutParams = view.layoutParams
                setBackgroundColor(Color.TRANSPARENT)
                childWebClient.setIsDirect(false)
                webViewClient = childWebClient
                webChromeClient = MyWebChromeClient()

            }

            // 화면에 추가하기
            constraintLayout.addView(childView)

            // 웹뷰 간 연동
            val transport = resultMsg.obj as WebView.WebViewTransport
            transport.webView = childView
            resultMsg.sendToTarget()

            return true
        }

        /// ---------- 팝업 닫기 ----------
        /// - window.close()가 호출되면 앞에서 생성한 팝업 webview를 닫아야 합니다.
        override fun onCloseWindow(window: WebView) {
            super.onCloseWindow(window)

            // 화면에서 제거하기
            constraintLayout.removeView(window)
        }
    }

}