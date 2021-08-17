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
import FBSDKCoreKit
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
            
            // FACEBOOK
        ApplicationDelegate.shared.application(
            application,
            didFinishLaunchingWithOptions: launchOptions
        )
            return true
    }
    // FACEBOOK Connect app delegate
    func application(
        _ app: UIApplication,
        open url: URL,
        options: [UIApplication.OpenURLOptionsKey : Any] = [:]
    ) -> Bool {
        
        ApplicationDelegate.shared.application(
            app,
            open: url,
            sourceApplication: options[UIApplication.OpenURLOptionsKey.sourceApplication] as? String,
            annotation: options[UIApplication.OpenURLOptionsKey.annotation]
        )
        
    }
    func application(
        _ application: UIApplication,
        open url: URL,
        sourceApplication: String?,
        annotation: Any
    ) -> Bool {
        
        return ApplicationDelegate.shared.application(
            application, open: url,
            sourceApplication: sourceApplication,
            annotation: annotation
        )
    }
      
    // ?? [start] 앱이 백그라운드에서 동작할 때, 알림을 받았을 때 동작하는 부분
    func application(_ application: UIApplication,
                     didReceiveRemoteNotification userInfo: [AnyHashable: Any]) {
        // If you are receiving a notification message while your app is in the background,
        // this callback will not be fired till the user taps on the notification launching the application.
        // TODO: Handle data of notification
        // With swizzling disabled you must let Messaging know about the message, for Analytics
        // Messaging.messaging().appDidReceiveMessage(userInfo)
        // Print message ID.
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
        // If you are receiving a notification message while your app is in the background,
        // this callback will not be fired till the user taps on the notification launching the application.
        // TODO: Handle data of notification
        // With swizzling disabled you must let Messaging know about the message, for Analytics
        // Messaging.messaging().appDidReceiveMessage(userInfo)
        // Print message ID.
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

