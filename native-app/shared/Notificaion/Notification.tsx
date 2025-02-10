import React, { useEffect } from "react"
import * as Notifications from "expo-notifications"

export function Notification() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })

  useEffect(() => {
    console.log("Notification component mounted")

    const sub = Notifications.addNotificationResponseReceivedListener(
      (notification) => {
        console.log(
          "Notification received:",
          notification.notification.request.content.data
        )
      }
    )

    return () => {
      console.log("Removing notification listener")
      sub.remove()
    }
  }, [])
  return <></>
}
