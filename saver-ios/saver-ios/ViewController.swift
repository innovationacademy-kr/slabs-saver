import UIKit
import WebKit
import Firebase
import UserNotifications
import FirebaseMessaging
import FBSDKShareKit

class ViewController: UIViewController,WKUIDelegate,WKNavigationDelegate {
    
    
    @IBOutlet weak var naviView: UIView!
    @IBOutlet weak var webBaseView: UIView!
    var webView: WKWebView?
    
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        
        // [start] 당겨서 새로고침
        let refreshControl = UIRefreshControl()
        refreshControl.addTarget(self, action: #selector(reloadWebView(_:)), for: .valueChanged)
        webView?.scrollView.addSubview(refreshControl)
    
        // [end] 당겨서 새로고침
        
        // [start] 백그라운드에서 포그라운드로 전환되면 실행되는 함수
        NotificationCenter.default.addObserver(forName: UIApplication.didBecomeActiveNotification, object: nil, queue: nil) { (Notification) in
            
            let userDefault = UserDefaults.standard
            let pushUrl:String? = userDefault.string(forKey: "PUSH_URL")
            
            //링크가 있는 푸시를 클릭하는 경우에만 실행
            if(pushUrl != nil){
                NSLog(pushUrl!)
                NSLog("푸시에서 전달받은 웹뷰로")
                let myUrl = URL(string: pushUrl!)
                let myRequest = URLRequest(url: myUrl!)
                self.webView?.load(myRequest)
                userDefault.removeObject(forKey: "PUSH_URL")
                userDefault.synchronize()
            }
        }
        // [end] 백그라운드에서 포그라운드로 전환되면 실행되는 함수
    }
    
    override func viewWillAppear(_ animated: Bool) {
        if self.webView == nil {
            setWebView()
        }
    }
    
    private func setWebView() {
        self.view.layoutIfNeeded()
        let contentController = WKUserContentController()
        let webConfiguration = WKWebViewConfiguration()
        
        // [start] 유저가 webview를 확대 축소하는 것을 방지
        let source: String = "var meta = document.createElement('meta');" +
            "meta.name = 'viewport';" +
            "meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';" +
            "var head = document.getElementsByTagName('head')[0];" +
            "head.appendChild(meta);"
        let script: WKUserScript = WKUserScript(source: source, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
        contentController.addUserScript(script)
        // [end] 유저가 webview를 확대 축소하는 것을 방지

        
        // [start] WK Birdge 등록
        contentController.add(self, name: "iosMessage")
        contentController.add(self, name: "initFollowStatus")
        contentController.add(self, name: "updateFollowStatus")
        contentController.add(self, name: "deleteFollowStatus")
        contentController.add(self, name: "logOut")
        /*
         * 이곳에 추가하고 싶은 함수를 등록하면, WKWebview에서 다음과 같은 형식으로 사용 가능합니다.
         * webkit.messageHandlers."해당 함수 이름".postMessage("넘기고 싶은 값");
         * Bridge들에 대한 라우터는 ./HandleWKBridge.swift 파일의 [WKScriptMessageHandler]
         */
        webConfiguration.userContentController = contentController
        // [end] WK Birdge 등록
        
        webView = WKWebView(frame: webBaseView.bounds, configuration: webConfiguration)
        webView?.uiDelegate = self
        webView?.navigationDelegate = self
        
        // [start] 현재 ios 앱 사용 중인 유져 감지를 위해 saver-web navigator.userAgent 에 내용 추가
        webView?.evaluateJavaScript("navigator.userAgent"){(result, error) in
            let originUserAgent = result as! String
            let agent = originUserAgent + " APP_IOS"
            self.webView?.customUserAgent = agent
        }
        // [end] 현재 ios 앱 사용 중인 유져 감지를 위해 saver-web navigator.userAgent 에 내용 추가
        
        
        // [start] 웹뷰 load
        let myURL = URL(string: "https://thesaver.io")
        let myRequest = URLRequest(url: myURL!)
        webView?.load(myRequest)
        webBaseView.addSubview(webView!)
        
        NSLayoutConstraint.activate([
            webView!.topAnchor.constraint(equalTo: webBaseView.topAnchor),
            webView!.leadingAnchor.constraint(equalTo: webBaseView.leadingAnchor),
            webView!.trailingAnchor.constraint(equalTo: webBaseView.trailingAnchor),
            webView!.bottomAnchor.constraint(equalTo: webBaseView.bottomAnchor)
        ])
        // [end] 웹뷰 load
    }
    
    // [start] swipe 새로고침 구현함수
    @objc func reloadWebView(_ sender: UIRefreshControl) {
        webView?.reload()
        sender.endRefreshing()
    }
    // [end] swipe 새로고침 구현함수
    
    // [start] 모달창 닫힐때 앱 종료현상 방지.
    override func didReceiveMemoryWarning() {
        
        super.didReceiveMemoryWarning()
    }
    // [end] 모달창 닫힐때 앱 종료현상 방지.
    
    //[start] alert 처리
    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        
        let alertController = UIAlertController(title: "", message: message, preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "확인", style: .default, handler: { (action) in completionHandler() }))
        
        self.present(alertController, animated: true, completion: nil)
    }
    //[end] alert 처리
    
    //[start] confirm 창 처리
    func webView (_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        
        let alertController = UIAlertController(title: "", message: message, preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "취소", style: .default, handler: { (action) in completionHandler(false) }))
        alertController.addAction(UIAlertAction(title: "확인", style: .default, handler: { (action) in completionHandler(true) }))
        self.present(alertController, animated: true, completion: nil)
    }
    //[end] confirm 창 처리
    
    // [start] href="_blank" 처리
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        
        if navigationAction.targetFrame == nil { webView.load(navigationAction.request) }
        return nil
        
    }
    // [end] href="_blank" 처리
    
    // [start] kakao 하이브리드앱 카카오링크
    func webView(_ webView: WKWebView,
                 decidePolicyFor navigationAction: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        print(navigationAction.request)
        var isNaviHidden =  navigationAction.request.mainDocumentURL?.absoluteString.contains("https://thesaver.io") == true
        setNaviState(isHidden: isNaviHidden)
        
        // 카카오 SDK가 호출하는 커스텀 스킴인 경우 open(_ url:) 메소드를 호출합니다.
        if let url = navigationAction.request.url
           , ["kakaokompassauth", "kakaolink"].contains(url.scheme) {
            // 카카오톡 실행
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
            
            decisionHandler(.cancel)
            return
        }
        decisionHandler(.allow)
    }
    // [end] kakao 하이브리드앱 카카오링크
    
    
    @IBAction func backAction(_ sender: Any) {
        
        if webView != nil && webView!.canGoBack == true {
            webView?.goBack()
        }
        
    }
    
    @IBAction func titleAction(_ sender: Any) {
        let myURL = URL(string: "https://thesaver.io")
        let myRequest = URLRequest(url: myURL!)
        webView?.load(myRequest)
    }
    
    private func setNaviState(isHidden: Bool) {
        naviView.isHidden = isHidden
        self.view.layoutIfNeeded()
        self.webView?.frame = self.webBaseView.bounds
    }
}

// [start] 페이스북 쉐어 컨트롤러
extension ViewController : SharingDelegate {
    
    func presentAlert(title: String, message: String) {
        let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)
        let dismissAction = UIAlertAction(title: "Dismiss", style: .default)
        alertController.addAction(dismissAction)
        present(alertController, animated: true)
    }
    
    func presentAlert(for error: Error) {
        let nsError = error as NSError
        
        guard let sdkMessage = nsError.userInfo["com.facebook.sdk:FBSDKErrorDeveloperMessageKey"] as? String
        else {
            preconditionFailure("Errors from the SDK should have a developer facing message")
        }
        presentAlert(title: "Sharing Error", message: sdkMessage)
    }
    
    func shareLink(url: String) {
        guard let url = URL(string: url) else {
            preconditionFailure("URL is invalid")
        }
        
        let content = ShareLinkContent()
        content.contentURL = url
        content.hashtag = Hashtag("#theSaver")
        
        dialog(withContent: content).show()
    }
    
    func dialog(withContent content: SharingContent) -> ShareDialog {
        return ShareDialog(
            fromViewController: self,
            content: content,
            delegate: self)
    }
}

extension ViewController {
    func sharer(_ sharer: Sharing, didCompleteWithResults results: [String : Any]) {
        print(results)
    }
    
    func sharer(_ sharer: Sharing, didFailWithError error: Error) {
        presentAlert(for: error)
    }
    
    func sharerDidCancel(_ sharer: Sharing) {
        presentAlert(title: "Cancelled", message: "Sharing cancelled")
    }
}
// [end] 페이스북 쉐어 컨트롤러
