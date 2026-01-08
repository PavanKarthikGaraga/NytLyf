// Settings Screen - Simplified (stores/hooks will be re-added later)
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../src/constants/theme';
import { useTheme } from '../src/contexts/ThemeContext';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  showArrow?: boolean;
  onPress?: () => void;
  colors: any;
}

interface SettingToggleProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  colors: any;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  value,
  showArrow = true,
  onPress,
  colors,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.settingItem, { borderBottomColor: colors.border.subtle }]}
    disabled={!onPress}
  >
    <View style={[styles.settingIcon, { backgroundColor: colors.background.tertiary }]}>
      <Ionicons name={icon} size={20} color={colors.text.secondary} />
    </View>
    <Text style={[styles.settingLabel, { color: colors.text.primary }]}>{label}</Text>
    {value && <Text style={[styles.settingValue, { color: colors.text.tertiary }]}>{value}</Text>}
    {showArrow && onPress && (
      <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
    )}
  </TouchableOpacity>
);

const SettingToggle: React.FC<SettingToggleProps> = ({
  icon,
  label,
  description,
  value,
  onValueChange,
  colors,
}) => (
  <View style={styles.settingItem}>
    <View style={[styles.settingIcon, { backgroundColor: colors.background.tertiary }]}>
      <Ionicons name={icon} size={20} color={colors.text.secondary} />
    </View>
    <View style={styles.settingContent}>
      <Text style={[styles.settingLabel, { color: colors.text.primary }]}>{label}</Text>
      {description && (
        <Text style={[styles.settingDescription, { color: colors.text.tertiary }]}>{description}</Text>
      )}
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.background.tertiary, true: `${colors.neon.pink}50` }}
      thumbColor={value ? colors.neon.pink : colors.text.muted}
    />
  </View>
);

export default function SettingsScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  // Notification settings
  const [notifyEvents, setNotifyEvents] = useState(true);
  const [notifyPromotions, setNotifyPromotions] = useState(true);
  const [notifyReminders, setNotifyReminders] = useState(true);

  // Location settings
  const [autoLocation, setAutoLocation] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: colors.background.secondary }]}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text.primary }]}>Settings</Text>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Notifications */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.tertiary }]}>Notifications</Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.background.secondary }]}>
            <SettingToggle
              icon="calendar"
              label="Event Updates"
              description="Get notified about events you're interested in"
              value={notifyEvents}
              onValueChange={setNotifyEvents}
              colors={colors}
            />
            <SettingToggle
              icon="megaphone"
              label="Promotions"
              description="Receive special offers and promotions"
              value={notifyPromotions}
              onValueChange={setNotifyPromotions}
              colors={colors}
            />
            <SettingToggle
              icon="alarm"
              label="Event Reminders"
              description="Reminders before saved events"
              value={notifyReminders}
              onValueChange={setNotifyReminders}
              colors={colors}
            />
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.tertiary }]}>Location</Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.background.secondary }]}>
            <SettingItem
              icon="location"
              label="Current City"
              value="Hyderabad"
              onPress={() => { }}
              colors={colors}
            />
            <SettingToggle
              icon="navigate"
              label="Auto-detect Location"
              description="Automatically detect your city"
              value={autoLocation}
              onValueChange={setAutoLocation}
              colors={colors}
            />
          </View>
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.tertiary }]}>Legal</Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.background.secondary }]}>
            <SettingItem
              icon="document-text"
              label="Terms of Service"
              onPress={() => { }}
              colors={colors}
            />
            <SettingItem
              icon="shield"
              label="Privacy Policy"
              onPress={() => { }}
              colors={colors}
            />
            <SettingItem
              icon="information-circle"
              label="About NYTLYF"
              onPress={() => { }}
              colors={colors}
            />
          </View>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.text.primary }]}>NYTLYF</Text>
          <Text style={[styles.versionNumber, { color: colors.text.muted }]}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    paddingHorizontal: SPACING.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '600',
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING['3xl'],
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  sectionContent: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginTop: 2,
  },
  settingValue: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginRight: SPACING.sm,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  versionText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '700',
  },
  versionNumber: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginTop: SPACING.xs,
  },
});
