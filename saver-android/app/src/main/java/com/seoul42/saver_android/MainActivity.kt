package com.seoul42.saver_android

import android.content.Intent
import android.net.Uri
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Message
import android.util.Log
import android.webkit.WebResourceRequest
import android.webkit.WebView
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.google.firebase.ktx.Firebase
import com.google.firebase.messaging.ktx.messaging
import java.net.URISyntaxException

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

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        startActivity(Intent(this, SplashScreenActivity::class.java))

        myWebView.apply {
            webViewClient = MyWebClient()
            webChromeClient = MyWebChromeClient()

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
        val baseUrl = "https://thesaver.io/";
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
            childView != null -> {
                childView?.loadUrl("javascript:window.close();");
            }
            else -> {
                finish()
            }
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

    inner class MyWebClient : android.webkit.WebViewClient() {
        override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {

            Log.d("클라", request.url.host.toString());
            if (request.url.scheme == "intent") {
                Log.d("앱", "1");
                try {
                    // Intent 생성
                    val intent = Intent.parseUri(request.url.toString(), Intent.URI_INTENT_SCHEME)

                    // 실행 가능한 앱이 있으면 앱 실행
                    if (intent.resolveActivity(packageManager) != null) {
                        startActivity(intent)
                        return true
                    }

                    // Fallback URL이 있으면 현재 웹뷰에 로딩
                    val fallbackUrl = intent.getStringExtra("browser_fallback_url")
                    if (fallbackUrl != null) {
                        view.loadUrl(fallbackUrl)
                        return true
                    }


                } catch (e: URISyntaxException) {
                    Log.e("error", "Invalid intent request", e)
                }
            } else if (request.url.host?.contains("facebook") == true) {
                try {
                    val intent: Intent = Uri.parse(request.url.toString()).let { webpage ->
                        Intent(Intent.ACTION_VIEW, webpage)
                        }
                    Log.d("들어옴","?");
                    // 실행 가능한 앱이 있으면 앱 실행
                    if (intent.resolveActivity(packageManager) != null) {
                        Log.d("앱실행","?");
                        startActivity(intent)
                        return true
                    }


                } catch (e: URISyntaxException) {
                    Log.e("error", "Invalid intent request", e)
                }
                // 나머지 서비스 로직 구현
            }
            return false

        }
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
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        webViewClient = view.webViewClient
                        webChromeClient = view.webChromeClient
                    }
                }

                // 화면에 추가하기
                constraintLayout.addView(childView)

                // 웹뷰 간 연동
                val transport = resultMsg.obj as WebView.WebViewTransport
                transport.webView = childView
                resultMsg.sendToTarget()
                Log.d("크롬", "열림");
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