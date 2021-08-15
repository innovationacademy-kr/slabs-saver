import UIKit
import WebKit
import Firebase
import UserNotifications
import FirebaseMessaging

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

func setPushCategories(followValue: Int, mode: Int) {
    
    print(followValue, mode)
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

