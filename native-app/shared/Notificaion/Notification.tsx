import React, { useEffect } from "react"
import * as Notifications from "expo-notifications"
import { useRouter } from "expo-router"

export function Notification() {
  const router = useRouter()
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })

  useEffect(() => {
    console.log("Notification component mounted")

    const subRecieved = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification.request.content.data)
      }
    )
    const subResponseRecieved =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        const alias = notification.notification.request.content.data.alias
        router.push(`/(app)/course/${alias}`)
      })

    return () => {
      console.log("Removing notification listener")
      subRecieved.remove()
      subResponseRecieved.remove()
    }
  }, [])
  return <></>
}
