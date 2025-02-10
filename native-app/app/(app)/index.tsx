import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native"
import { useAtomValue, useSetAtom } from "jotai"
import React, { useEffect } from "react"
import * as Notifications from "expo-notifications"

import { useTheme } from "../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../constants/Colors"
import ThemeSwitch from "../../shared/ThemeSwitch/ThemeSwitch"
import {
  courseAtom,
  loadCourseAtom,
} from "../../entities/course/model/course.state"
import { CourseCard } from "../../widget/course/ui/CourseCard/CourseCard"
import { Gaps } from "../../shared/tokens"
import { StudentCourseDescription } from "../../entities/course/model/course.model"
import { Button } from "../../shared/Button/Button"

export default function MyCourses() {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light
  const { isLoading, error, courses } = useAtomValue(courseAtom)

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      justifyContent: "center",
      flex: 1,
      padding: 20,
      flexDirection: "column",
      gap: Gaps.g20,
    },
    bottom: {
      marginTop: "auto",
      backgroundColor: theme.background,
    },
    activity: { marginTop: 30 },
    reminder: {
      paddingHorizontal: 30,
      paddingTop: 8,
    },
  })

  const loadCourse = useSetAtom(loadCourseAtom)

  useEffect(() => {
    loadCourse()
  }, [])

  const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
    return (
      <View style={styles.container}>
        <CourseCard totalLessons={0} passedLessons={0} {...item} />
      </View>
    )
  }

  const allowNotification = async () => {
    const settings = await Notifications.getPermissionsAsync()
    return (
      settings.granted ||
      settings.ios?.status == Notifications.IosAuthorizationStatus.PROVISIONAL
    )
  }

  const requestPermission = async () => {
    return Notifications.requestPermissionsAsync()
  }

  const scheduleNotification = async () => {
    const granted = await allowNotification()
    if (!granted) {
      await requestPermission()
    }
    Notifications.scheduleNotificationAsync({
      content: {
        title: "You have new notification",
        body: "You're awesome, dude!",
        data: { success: true },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 60,
      },
    })
  }

  return (
    <>
      {isLoading && (
        <ActivityIndicator
          style={styles.activity}
          size="large"
          color={theme.preHover}
        />
      )}

      {courses.length > 0 && (
        <FlatList
          refreshControl={
            <RefreshControl
              tintColor={theme.preHover}
              titleColor={theme.text}
              refreshing={isLoading}
              onRefresh={loadCourse}
            />
          }
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCourse}
        />
      )}
      <View style={styles.bottom}>
        <View style={styles.reminder}>
          <Button
            title="Remind me later"
            isDarkMode={isDarkMode}
            onPress={scheduleNotification}
          />
        </View>
        <ThemeSwitch />
      </View>
    </>
  )
}
