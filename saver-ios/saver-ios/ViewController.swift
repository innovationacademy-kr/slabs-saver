import UIKit
import WebKit

class ViewController: UIViewController,WKUIDelegate,WKNavigationDelegate {
    
    
    @IBOutlet var webView: WKWebView!
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        
        let webConfiguration = WKWebViewConfiguration()
        webView = WKWebView(frame: self.view.frame, configuration: webConfiguration)
        webView.uiDelegate = self
        self.view.addSubview(webView)
        
        let myURL = URL(string: "http://localhost:1234")
        let myRequest = URLRequest(url: myURL!)
        
        webView.load(myRequest)
        
        let refreshControl = UIRefreshControl()
        
        refreshControl.addTarget(self, action: #selector(reloadWebView(_:)), for: .valueChanged)
        webView.scrollView.addSubview(refreshControl)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        
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
            viewBounds.origin.y = window.safeAreaInsets.top;
            viewBounds.origin.x = 0
            viewBounds.size.height = screenHeight - window.safeAreaInsets.top - window.safeAreaInsets.bottom
            viewBounds.size.width = screenWidth
            webView.scrollView.contentInsetAdjustmentBehavior = .never
        }
        self.webView.frame = viewBounds;
    }

    
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        
        viewWillAppear(true)
    }
    
    @objc func reloadWebView(_ sender: UIRefreshControl) {
        webView.reload()
        sender.endRefreshing()
    }
    
    //모달창 닫힐때 앱 종료현상 방지.
    override func didReceiveMemoryWarning() {
        
        super.didReceiveMemoryWarning()
    }
    
    //alert 처리
    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        
        let alertController = UIAlertController(title: "", message: message, preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "확인", style: .default, handler: { (action) in completionHandler() }))
        
        self.present(alertController, animated: true, completion: nil)
        
    }
    
    //confirm 처리
    func webView (_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        
        let alertController = UIAlertController(title: "", message: message, preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "취소", style: .default, handler: { (action) in completionHandler(false) }))
        alertController.addAction(UIAlertAction(title: "확인", style: .default, handler: { (action) in completionHandler(true) }))
        self.present(alertController, animated: true, completion: nil)
    }
    
    // href="_blank" 처리
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        
        if navigationAction.targetFrame == nil { webView.load(navigationAction.request) }
        return nil
        
    }
    
}
