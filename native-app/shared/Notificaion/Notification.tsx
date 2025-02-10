import React from "react"
import * as Notifications from "expo-notifications"

export function Notification() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })
  return <></>
}
