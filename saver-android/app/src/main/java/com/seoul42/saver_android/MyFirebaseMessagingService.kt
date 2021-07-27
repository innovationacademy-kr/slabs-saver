package com.seoul42.saver_android

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.media.RingtoneManager
import android.os.Build
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService: FirebaseMessagingService() {

    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        Log.d("firebase", "메세지 수신 성공!")
        if(message.notification != null) {
            sendNotification(message.notification?.body, message.notification?.title)
        }
        else {
            createNotificationChannel(this, NotificationManagerCompat.IMPORTANCE_HIGH, false,
                "CHANNEL_NAME", "App notification channel")
            NotificationManagerCompat.from(this).notify(0, createNotification(message))
        }
    }

    private fun  createNotification(message: RemoteMessage): Notification
    {
        val notificationIntent =  Intent(this,MainActivity::class.java)
        notificationIntent.putExtra("url",message.data["url"])
        Log.d("url", message.data["url"].toString());
        val pendingIntent = PendingIntent.getActivity(this, 0,notificationIntent,PendingIntent.FLAG_UPDATE_CURRENT)

        val notificationBuilder = NotificationCompat.Builder(this, "CHANNEL_ID")
            .setSmallIcon(R.drawable.logo_icon)
            .setContentTitle(message.data["title"])
            .setContentText(message.data["message"])
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)

            .setContentIntent(pendingIntent)
            .setAutoCancel(true)

        return  notificationBuilder.build()
    }

    private fun sendNotification(body: String?, title: String?) {
        val intent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            putExtra("Notification", body)
            putExtra("Notification",title)
        }

        var pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT)
        val notificationSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION)

        val notificationId = 1001
        createNotificationChannel(this, NotificationManagerCompat.IMPORTANCE_HIGH, false,
            getString(R.string.app_name), "App notification channel")

        val channelId = "$packageName-${getString(R.string.app_name)}"

        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        val fullScreenPendingIntent = PendingIntent.getActivity(baseContext, 0,
            intent, PendingIntent.FLAG_UPDATE_CURRENT)

        //https://mrw0119.tistory.com/146 참조
        var notificationBuilder = NotificationCompat.Builder(this,channelId)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentTitle(title)
            .setContentText(body)
            .setAutoCancel(true)
            .setSound(notificationSound)
            .setContentIntent(pendingIntent)
            .setFullScreenIntent(fullScreenPendingIntent, true)
            .setTimeoutAfter(3000)

        notificationBuilder.priority = NotificationCompat.PRIORITY_HIGH
        var notificationManager: NotificationManager = this.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify(notificationId, notificationBuilder.build())
    }

    private fun createNotificationChannel(context: Context, importance: Int, showBadge: Boolean,
                                          name: String, description: String) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelId = "${context.packageName}-$name"
            val channel = NotificationChannel(channelId, name, importance)
            channel.description = description
            channel.setShowBadge(showBadge)

            val notificationManager = context.getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(channel)
        }
    }

}