// Root Layout - App Entry Point
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, LogBox } from 'react-native';

// Suppress react-native-web internal warning (not fixable in user code)
LogBox.ignoreLogs(['props.pointerEvents is deprecated']);

const COLORS = {
  background: '#0A0A0F',
};

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={COLORS.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="event/[id]"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="category/[slug]"
          options={{ headerShown: false }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
