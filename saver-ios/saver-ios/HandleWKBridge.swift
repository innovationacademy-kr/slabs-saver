import UIKit
import WebKit
import Firebase
import UserNotifications
import FirebaseMessaging

// [start] 호출된 Bridge 처리
extension ViewController: WKScriptMessageHandler {
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        
        let value = Int((message.body as! NSString).floatValue)
        
        switch message.name {
        case "initFollowStatus" :
            // message.body가 string으로 들어와야 함.
            initFollowStatus(followValue: message.body as! [Int])
        case "updateFollowStatus":
            setPushCategories(followValue: value, mode: 0);
        case "deleteFollowStatus":
            setPushCategories(followValue: value, mode: 1);
        case "iosMessage":
            shareLink(url: message.body as! String)
        case "logOut":
            setLogOut(value: message.body as! String)
        default:
            break
        }
    }
}
// [end] 호출된 Bridge 처리

// [start] 로그아웃 시, 해당 기기의 firebase 모든 카테고리 구독취소
func setLogOut(value: String) {
    print(value)
    for status in 1...6 {
        Messaging.messaging().unsubscribe(fromTopic: String(status)) { error in
            print("Unsubscribed to \(status) topic")
        }
    }
}
// [end] 로그아웃 시, ...

// [start] 로그인을 할 때, 해당 유저의 followingCategories db에 대해서, firebase에 구독 init
func initFollowStatus(followValue: [Int]) {
    
    for status in 1...6 {
        
        if followValue.contains(status) == true {
            Messaging.messaging().subscribe(toTopic: String(status)) { error in
                print("Subscribed to \(followValue) topic")
            }
        }
        else {
            Messaging.messaging().unsubscribe(fromTopic: String(status)) { error in
                print("Unsubscribed to \(followValue) topic")
            }
        }
    }
}
// [end] 로그인을 할 때, 해당 유저의 followingCategories db에 대해서, firebase에 구독 init

// [start] 버튼을 눌렀을 때, follow, unfollow 작동
func setPushCategories(followValue: Int, mode: Int) {
    
    if mode == 0 {
        Messaging.messaging().subscribe(toTopic: String(followValue)) { error in
            print("Subscribed to \(followValue) topic")
        }
    }
    else {
        Messaging.messaging().unsubscribe(fromTopic: String(followValue)) { error in
            print("Unsubscribed to \(followValue) topic")
        }
    }
}
// [end] 버튼을 눌렀을 때, follow, unfollow 작동


// [start] log out 시 앱의 구독기능 초기화
func unablePush(followValue: [Int]) {
    
    for status in 1...6 {

            Messaging.messaging().unsubscribe(fromTopic: String(status)) { error in
                print("Unsubscribed to \(followValue) topic")
                
            }
    }
}
// [end] log out 시 앱의 구독기능 초기화
