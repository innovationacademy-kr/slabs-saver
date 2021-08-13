import UIKit
import WebKit
import Firebase
import UserNotifications
import FirebaseMessaging

func    setPushCategories(followStatus: [Int]) {
    
    Messaging.messaging().subscribe(toTopic: "1") { error in
      print("Subscribed to economy topic")
    }
    Messaging.messaging().subscribe(toTopic: "2") { error in
      print("Subscribed to politic topic")
    }
    Messaging.messaging().subscribe(toTopic: "3") { error in
      print("Subscribed to international topic")
    }
    Messaging.messaging().subscribe(toTopic: "4") { error in
      print("Subscribed to social topic")
    }
    Messaging.messaging().subscribe(toTopic: "5") { error in
      print("Subscribed to social topic")
    }
    Messaging.messaging().subscribe(toTopic: "6") { error in
      print("Subscribed to social topic")
    }
}

