package com.seoul42.saver_android

import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.util.Log
import android.webkit.WebResourceRequest
import android.webkit.WebView

import androidx.appcompat.app.AppCompatActivity
import com.facebook.CallbackManager
import com.facebook.FacebookCallback
import com.facebook.FacebookException
import com.facebook.share.Sharer
import com.facebook.share.model.ShareLinkContent
import com.facebook.share.widget.ShareDialog
import java.net.URISyntaxException

class MyWebClient private  constructor() : android.webkit.WebViewClient() {
    private var callbackManager: CallbackManager? = null
    private var shareDialog: ShareDialog? = null
    private var packageManager: PackageManager? = null
    private var activity: AppCompatActivity? = null
    private var isRedirect = false
    private var view : WebView? = null

    constructor(activity: AppCompatActivity, packageManager: PackageManager) : this() {
        this.activity = activity
        this.packageManager = packageManager
        callbackManager = CallbackManager.Factory.create();
        shareDialog = ShareDialog(activity);

        shareDialog?.registerCallback(callbackManager, object : FacebookCallback<Sharer.Result> {
            override fun onSuccess(result: Sharer.Result?) {
                Log.d("#", "성공")
                view?.loadUrl("javascript:window.close();");
               // activity.onBackPressed()
            }

            override fun onCancel() {
                Log.d("#", "취소")
                view?.loadUrl("javascript:window.close();");
                //activity.onBackPressed()
            }

            override fun onError(error: FacebookException?) {
                Log.d("#", "실패" + error.toString())
                view?.loadUrl("javascript:window.close();");
               // activity.onBackPressed()
            }
        });
    }

    public fun getCallbackManager(): CallbackManager? {
        return callbackManager
    }

    public fun setIsDirect(isRedirect: Boolean) {
        this.isRedirect = isRedirect
    }


    override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {

        if (isRedirect)
            return false
        else
            isRedirect = true
        this.view = view
        if (request.url.scheme == "intent") {
            try {
                // Intent 생성
                val intent = Intent.parseUri(request.url.toString(), Intent.URI_INTENT_SCHEME)

                // 실행 가능한 앱이 있으면 앱 실행
                if (packageManager != null && intent.resolveActivity(packageManager!!) != null) {
                    activity?.startActivity(intent)
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
        }
        //페이스북 연결인 경우
        else if (request.url.host?.contains("facebook") == true) {
            try {
                var url = request.url.toString()
                url = url.substring(url.indexOf("u=") + 2, url.length)
                //페이스북 링크 설정
                val linkContent = ShareLinkContent.Builder()
                    .setContentUrl(Uri.parse(url)).build()
                //모드를 AUTOMATIC으로 설정해 페이스북 앱이 있으면 앱을 연결시켜주고 없으면 다이얼로그를  보여줌
                shareDialog?.show(linkContent, ShareDialog.Mode.AUTOMATIC)
                return true
            } catch (e: URISyntaxException) {
                Log.e("#error", "Invalid intent request", e)
            }
        }
        return false

    }
}