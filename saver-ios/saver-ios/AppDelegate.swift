import UIKit
import Firebase
import FirebaseMessaging
import UserNotifications
import KakaoSDKCommon
import FBSDKCoreKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    var window: UIWindow?
    let gcmMessageIDKey = "gcm.message_id"
    
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication
                        .LaunchOptionsKey: Any]?) -> Bool {
        
        FirebaseApp.configure()
        
        // [start] launch 화면 대기 시간
        Thread.sleep(forTimeInterval: 2.0)
        // [end] launch 화면 대기 시간
        
        // [start] kakaoApp Key 등록 (Config 파일 의존)
        let kakaoAppKey = Bundle.main.object(forInfoDictionaryKey: "KAKAO_APP_KEY") as? String
        if let appKey = kakaoAppKey {
            KakaoSDKCommon.initSDK(appKey: appKey)
        } else {
            print("App Key does not exist")
        }
        // [end] kakaoApp Key 등록 (Config 파일 의존)
        
        // [START set_messaging_delegate]
        Messaging.messaging().delegate = self
        // [END set_messaging_delegate]
        
        // [start] push notification에 대한 권한 설정 Allow 여부를 유저에게 묻고, 수락시 이를 등록함
        if #available(iOS 10.0, *) {
            
            UNUserNotificationCenter.current().delegate = self
            
            let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
            UNUserNotificationCenter.current().requestAuthorization(
                options: authOptions,
                completionHandler: { _, _ in }
            )
        } else {
            let settings: UIUserNotificationSettings =
                UIUserNotificationSettings(types: [.alert, .badge, .sound], categories: nil)
            application.registerUserNotificationSettings(settings)
        }
        
        application.registerForRemoteNotifications()
        // [end] push notification에 대한 권한 설정 Allow 여부를 묻고, 수락시 이를 등록함
        
        // [END register_for_notifications]
        
        // [start] FACEBOOK
        ApplicationDelegate.shared.application(
            application,
            didFinishLaunchingWithOptions: launchOptions
        )
        // [end] FACEBOOK
        
        return true
    }
    
    // [start] FACEBOOK Connect app delegate
    func application (_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        
        ApplicationDelegate.shared.application(
            app,
            open: url,
            sourceApplication: options[UIApplication.OpenURLOptionsKey.sourceApplication] as? String,
            annotation: options[UIApplication.OpenURLOptionsKey.annotation] )
    }
    
    func application (_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
        
        return ApplicationDelegate.shared.application(
            application, open: url,
            sourceApplication: sourceApplication,
            annotation: annotation
        )
    }
    // [end] FACEBOOK Connect app delegate
    
    // [start] 앱이 백그라운드에서 동작할 때, 알림을 받았을 때 동작하는 부분
    func application(_ application: UIApplication,
                     didReceiveRemoteNotification userInfo: [AnyHashable: Any]) {
        
        if let messageID = userInfo[gcmMessageIDKey] {
            
            print("1. Message ID: \(messageID)")
            sendNotification(seconds: 10, userInfo: userInfo)
        }
    }
    // [end] 앱이 백그라운드에서 동작할 때, 알림을 받았을 때 동작하는 부분
    
    
    //  [start] 앱이 포그라운드에서 동작할 때, 알림을 받았을 때 동작하는 부분
    func application(_ application: UIApplication,
                     didReceiveRemoteNotification userInfo: [AnyHashable: Any],
                     fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult)
                        -> Void) {
        
        if let messageID = userInfo[gcmMessageIDKey] {
            
            print("2. Message ID: \(messageID)")
            sendNotification(seconds: 10, userInfo: userInfo)
        }
        completionHandler(UIBackgroundFetchResult.newData)
    }
    //  [end] 앱이 포그라운드에서 동작할 때, 알림을 받았을 때 동작하는 부분
    
    
    // [start] push noti를 클릭했을 때 동작하는 부분
    @available(iOS 10.0, *)
    func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
        
        let pushUrl = response.notification.request.content.userInfo["url"] as? String
        if pushUrl !=  nil {
            if UIApplication.shared.applicationState == .active {
                print("forground notification clicked")
                let vc = UIApplication.shared.windows.first!.rootViewController as! ViewController
                
                let myURL = URL(string: pushUrl!)
                let myRequest = URLRequest(url: myURL!)
                vc.webView.load(myRequest)
            }
            else {
                print("background notification clicked")
                let userDefault = UserDefaults.standard
                userDefault.set(pushUrl, forKey: "PUSH_URL")
                userDefault.synchronize()
            }
        } else {
            print("링크 없는 알림")
            
        }
        completionHandler()
    }
    // [end] push noti를 클릭했을 때 동작하는 부분
    
    // [start] APN token 등록에 error가 발생했을 때
    func application(_ application: UIApplication,
                     didFailToRegisterForRemoteNotificationsWithError error: Error) {
        print("Unable to register for remote notifications: \(error.localizedDescription)")
    }
    // [end] APN token 등록에 error가 발생했을 때
    
    // [start] APN token 등록 성공
    func application(_ application: UIApplication,
                     didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        print("APNs token retrieved: \(deviceToken)")
        
    }
    // [end] APN token 등록 성공
    
    // [start] Notification 생성
    func sendNotification(seconds: Double, userInfo: [AnyHashable : Any]) {
        
        let notificationContent = UNMutableNotificationContent()
        
        notificationContent.title = userInfo["title"] as! String
        notificationContent.body = userInfo["message"] as! String
        notificationContent.userInfo = userInfo
        
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: seconds, repeats: false)
        let request = UNNotificationRequest(identifier: "notification",
                                            content: notificationContent,
                                            trigger: trigger)
        
        UNUserNotificationCenter.current().add(request) { error in
            if let error = error {
                print("Notification Error: ", error)
            }
        }
    }
    // [end] Notification 생성
}

// [START ios_10_message_handling] : 들어온 notification info를 바탕으로 push 알람을 띄우는 작업
@available(iOS 10, *)
extension AppDelegate: UNUserNotificationCenterDelegate {
    // Receive displayed notifications for iOS 10 devices.
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions)
                                    -> Void) {
        let userInfo = notification.request.content.userInfo
        
        // With swizzling disabled you must let Messaging know about the message, for Analytics
        // Messaging.messaging().appDidReceiveMessage(userInfo)
        // [START_EXCLUDE]
        // Print message ID.
        if let messageID = userInfo[gcmMessageIDKey] {
            print("Message ID: \(messageID)")
        }
        // [END_EXCLUDE]
        // Print full message.
        print("message handling: ", userInfo)
        
        // Change this to your preferred presentation option
        
        completionHandler([[.badge, .banner, .sound]])
    }
}
// [END] message_handling


extension AppDelegate: MessagingDelegate {
    // [START] refresh_token
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        print("Firebase registration token: \(String(describing: fcmToken))")
        
        let dataDict: [String: String] = ["token": fcmToken ?? ""]
        NotificationCenter.default.post(
            name: Notification.Name("FCMToken"),
            object: nil,
            userInfo: dataDict
        )
        // TODO: If necessary send token to application server.
        // Note: This callback is fired at each app startup and whenever a new token is generated.
    }
    
    // [END] refresh_token
}

