//
//  AppDelegate.swift
//  saver-ios
//
//  Created by Junhong Park on 2021/07/22.
//

import UIKit
import Firebase
import UserNotifications
import FirebaseMessaging
import KakaoSDKCommon
import UserNotifications


@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    var window: UIWindow?
    let gcmMessageIDKey = "gcm.message_id"
    
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication
                        .LaunchOptionsKey: Any]?) -> Bool {
        
        FirebaseApp.configure()
        
        let kakaoAppKey = Bundle.main.object(forInfoDictionaryKey: "KAKAO_APP_KEY") as? String
        
        if let appKey = kakaoAppKey {
            KakaoSDKCommon.initSDK(appKey: appKey)
        } else {
            print("App Key does not exist")
        }
        
        // [start] launch 화면 대기 시간
        Thread.sleep(forTimeInterval: 2.0)
        // [end] launch 화면 대기 시간
        
        // [START set_messaging_delegate]
        Messaging.messaging().delegate = self
        // [END set_messaging_delegate]
        // Register for remote notifications. This shows a permission dialog on first run, to
        // show the dialog at a more appropriate time move this registration accordingly.
        // [START register_for_notifications]
        if #available(iOS 10.0, *) {
            // For iOS 10 display notification (sent via APNS)
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
        
        // [END register_for_notifications]
        return true
    }
    
    // [start] 앱이 백그라운드에서 동작할 때, 알림을 받았을 때 동작하는 부분
    func application(_ application: UIApplication,
                     didReceiveRemoteNotification userInfo: [AnyHashable: Any]) {
        // If you are receiving a notification message while your app is in the background,
        // this callback will not be fired till the user taps on the notification launching the application.
        // TODO: Handle data of notification
        // With swizzling disabled you must let Messaging know about the message, for Analytics
        // Messaging.messaging().appDidReceiveMessage(userInfo)
        // Print message ID.
        if let messageID = userInfo[gcmMessageIDKey] {
            
            print("Message ID: \(messageID)")
            let title = userInfo["title"] ?? ""
            let message = userInfo["message"] ?? ""
            let url = userInfo["url"] ?? ""
            
            print("1. Message ID: \(messageID)")
            sendNotification(seconds: 10, title: title as! String, body: message as! String, url: url as! String)
        }
    }
    // [end] 앱이 백그라운드에서 동작할 때, 알림을 받았을 때 동작하는 부분
    
    //  [start] 앱이 포그라운드에서 동작할 때, 알림을 받았을 때 동작하는 부분
    func application(_ application: UIApplication,
                     didReceiveRemoteNotification userInfo: [AnyHashable: Any],
                     fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult)
                        -> Void) {
        // If you are receiving a notification message while your app is in the background,
        // this callback will not be fired till the user taps on the notification launching the application.
        // TODO: Handle data of notification
        // With swizzling disabled you must let Messaging know about the message, for Analytics
        // Messaging.messaging().appDidReceiveMessage(userInfo)
        // Print message ID.
        if let messageID = userInfo[gcmMessageIDKey] {
            
            let title = userInfo["title"] ?? ""
            let message = userInfo["message"] ?? ""
            let url = userInfo["url"] ?? ""
            
            print("2. Message ID: \(messageID)")
            sendNotification(seconds: 10, title: title as! String, body: message as! String, url: url as! String)
        }
        completionHandler(UIBackgroundFetchResult.newData)
    }
    //  [end] 앱이 포그라운드에서 동작할 때, 알림을 받았을 때 동작하는 부분
    
    
    // [start] push noti를 클릭했을 때 동작하는 부분
    @available(iOS 10.0, *)
    func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
        
        print("푸시 클릭하고 들어옴")
        let pushUrl = response.notification.request.content.userInfo["url"] as? String
        print((pushUrl ?? "링크 없음") as String)
        if pushUrl !=  nil {
            print("앱델레케이트 푸시타고 들어옴, 링크있음")
            if UIApplication.shared.applicationState == .active {
                print("포그라운드에서 클릭")
                let vc = UIApplication.shared.windows.first!.rootViewController as! ViewController
                
                let myURL = URL(string: pushUrl!)
                let myRequest = URLRequest(url: myURL!)
                vc.webView.load(myRequest)
            }
            else {
                print("백그라운드에서 클릭")
                let userDefault = UserDefaults.standard
                userDefault.set(pushUrl, forKey: "PUSH_URL")
                userDefault.synchronize()
                
            }
        } else {
            print("앱델레케이트 푸시타고 들어옴, 링크 없음")
            
        }
        completionHandler()
    }
    // [end] push noti를 클릭했을 때 동작하는 부분
    
    
    func application(_ application: UIApplication,
                     didFailToRegisterForRemoteNotificationsWithError error: Error) {
        print("Unable to register for remote notifications: \(error.localizedDescription)")
    }
    
    // This function is added here only for debugging purposes, and can be removed if swizzling is enabled.
    // If swizzling is disabled then this function must be implemented so that the APNs token can be paired to
    // the FCM registration token.
    func application(_ application: UIApplication,
                     didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        print("APNs token retrieved: \(deviceToken)")
        
        // With swizzling disabled you must set the APNs token here.
        // Messaging.messaging().apnsToken = deviceToken
    }
    
    // [start] Notification 생성
    func sendNotification(seconds: Double, title: String, body: String, url: String) {
        
        let notificationContent = UNMutableNotificationContent()
        
        notificationContent.title = title
        notificationContent.body = body
        
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

// [START ios_10_message_handling]
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
    // [START refresh_token]
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
    
    // [END refresh_token]
}

