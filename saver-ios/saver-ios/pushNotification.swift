import UIKit
import WebKit
import Firebase
import UserNotifications
import FirebaseMessaging

func    setPushCategories(followValue: String, mode: Int) {
    
    print(followValue, mode)
    if mode == 0 {
        Messaging.messaging().subscribe(toTopic: followValue) { error in
            print("Subscribed to \(followValue) topic")
        }
    }
    else {
        Messaging.messaging().unsubscribe(fromTopic: followValue) { error in
            print("Unsubscribed to \(followValue) topic")
        }
    }
    
}

