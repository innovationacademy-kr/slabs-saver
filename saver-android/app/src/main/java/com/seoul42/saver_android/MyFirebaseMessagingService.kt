package com.seoul42.saver_android

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import android.widget.RemoteViews
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService(): FirebaseMessagingService() {
    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        Log.d("firebase", "메세지 수신 성공!")
        createNotificationChannel()
        NotificationManagerCompat.from(this).notify(0,createNotification(message))
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

    private fun createNotificationChannel(){
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
        {
            val channel = NotificationChannel("CHANNEL_ID", "CHANNEL_NAME", NotificationManager.IMPORTANCE_DEFAULT)
            channel.description = "CHANNEL_DESCRIPTION"
            (getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager).createNotificationChannel((channel))
        }
    }

}