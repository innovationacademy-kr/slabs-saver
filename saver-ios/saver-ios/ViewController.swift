import UIKit
import WebKit
import Firebase
import UserNotifications
import FirebaseMessaging
import FBSDKShareKit

class ViewController: UIViewController,WKUIDelegate,WKNavigationDelegate {
    
    @IBOutlet var webView: WKWebView!
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        
        let contentController = WKUserContentController()
        let webConfiguration = WKWebViewConfiguration()
        
        // [start] Birdge 등록
        contentController.add(self, name: "getFollowStatus")
        contentController.add(self, name: "iosMessage")
        webConfiguration.userContentController = contentController
        // [end] Birdge 등록
        
        webView = WKWebView(frame: self.view.frame, configuration: webConfiguration)
        webView.uiDelegate = self
        webView.navigationDelegate = self
        
        
        // [start] 현재 ios 앱 사용 중인 유져 감지를 위해 saver-web navigator.userAgent 에 내용 추가
        webView.evaluateJavaScript("navigator.userAgent"){(result, error) in
            let originUserAgent = result as! String
            let agent = originUserAgent + " APP_IOS"
            self.webView.customUserAgent = agent
        }
        // [end] navigator.userAgent 내용 추가 완료
        
        
        // [start] 웹뷰 load
        let myURL = URL(string: "https://dev.thesaver.io")
        let myRequest = URLRequest(url: myURL!)
        webView.load(myRequest)
        self.view.addSubview(webView)
        // [end] 웹뷰 load
        
        // [start] 당겨서 새로고침
        let refreshControl = UIRefreshControl()
        refreshControl.addTarget(self, action: #selector(reloadWebView(_:)), for: .valueChanged)
        webView.scrollView.addSubview(refreshControl)
        // [end] 당겨서 새로고침
    }
    
    override func viewWillAppear(_ animated: Bool) {
        
        // [start] 화면 구성
        // 화면이 회전할 때 대응하기 위해 만들어놓은 것. 이 부분은 현재 issue로 인해 아직 실행되지 않는다.
        var viewBounds:CGRect = self.view.bounds
        let window = UIApplication.shared.windows[0]
        
        var screenHeight: CGFloat!
        var screenWidth: CGFloat!
        
        if UIScreen.main.bounds.height > UIScreen.main.bounds.width {
            
            screenHeight = UIScreen.main.bounds.height
            screenWidth = UIScreen.main.bounds.width
        }
        else {
            
            screenHeight = UIScreen.main.bounds.width
            screenWidth = UIScreen.main.bounds.height
        }
        
        if UIDevice.current.orientation.isLandscape {
            
            viewBounds.origin.y = 0
            viewBounds.origin.x = window.safeAreaInsets.right;
            viewBounds.size.width = screenHeight - window.safeAreaInsets.right
            viewBounds.size.height = screenWidth
            webView.scrollView.contentInsetAdjustmentBehavior = .never
        }
        else {
            // 실제로 동작하는 부분.
            viewBounds.origin.y = window.safeAreaInsets.top - 5;
            viewBounds.origin.x = 0
            viewBounds.size.height = screenHeight - window.safeAreaInsets.top - window.safeAreaInsets.bottom + 5
            viewBounds.size.width = screenWidth
            webView.scrollView.contentInsetAdjustmentBehavior = .never
        }
        self.webView.frame = viewBounds;
        // [end] 화면 구성
    }
    
    // [start] 화면이 돌아갈 때
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        
        viewWillAppear(true)
    }
    // [end] 화면이 돌아갈 때
    
    // [start] 새로고침 구현함수
    @objc func reloadWebView(_ sender: UIRefreshControl) {
        webView.reload()
        sender.endRefreshing()
    }
    // [end] 새로고침 구현함수
    
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
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void
    ) {
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
    
}

// [start] 호출된 Bridge 처리
extension ViewController: WKScriptMessageHandler {
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        switch message.name {
        case "getFollowStatus":
            setPushCategories(followStatus: [1,2,3]);
        case "iosMessage":
            shareLink(url: message.body as! String)
        default:
            break
        }
    }
}
// [end] 호출된 Bridge 처리

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
            delegate: self
        )
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
