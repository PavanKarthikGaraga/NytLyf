// Tabs Layout - Bottom Tab Navigation
import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/constants/theme';

type IconName = 'home' | 'compass' | 'grid' | 'bookmark' | 'person';

interface TabIconProps {
  name: IconName;
  focused: boolean;
  colors: any;
}

const TabIcon: React.FC<TabIconProps> = ({ name, focused, colors }) => {
  const iconName = focused ? name : (`${name}-outline` as keyof typeof Ionicons.glyphMap);

  return (
    <View style={styles.iconContainer}>
      {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.neon.pink }]} />}
      <Ionicons
        name={iconName}
        size={24}
        color={focused ? colors.neon.pink : colors.text.tertiary}
      />
    </View>
  );
};

export default function TabsLayout() {
  const colors = COLORS;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: colors.background.secondary,
            borderTopColor: colors.border.subtle,
          }
        ],
        tabBarActiveTintColor: colors.neon.pink,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} colors={colors} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => <TabIcon name="compass" focused={focused} colors={colors} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ focused }) => <TabIcon name="grid" focused={focused} colors={colors} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused }) => <TabIcon name="bookmark" focused={focused} colors={colors} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon name="person" focused={focused} colors={colors} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 88 : 70,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
