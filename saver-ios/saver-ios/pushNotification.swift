import UIKit
import WebKit
import Firebase
import UserNotifications
import FirebaseMessaging

func    setPushCategories(followStatus: [Int]) {
    
    Messaging.messaging().subscribe(toTopic: "Any") { error in
      print("Subscribed to Any topic")
    }
}

