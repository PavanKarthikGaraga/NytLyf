// Card Component - Dark Theme with Neon Accents
import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

type CardVariant = 'default' | 'elevated' | 'bordered' | 'neon';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
  style?: ViewStyle;
  neonColor?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  onPress,
  style,
  neonColor = COLORS.neon.pink,
}) => {
  const getCardStyle = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          ...styles.base,
          ...SHADOWS.md,
        };
      case 'bordered':
        return {
          ...styles.base,
          borderWidth: 1,
          borderColor: COLORS.border.default,
        };
      case 'neon':
        return {
          ...styles.base,
          borderWidth: 1,
          borderColor: neonColor,
          shadowColor: neonColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 4,
        };
      default:
        return styles.base;
    }
  };

  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      onPress={onPress}
      style={({ pressed }: { pressed?: boolean }) => [
        getCardStyle(),
        pressed && onPress && styles.pressed,
        style,
      ]}
    >
      {children}
    </Wrapper>
  );
};

// Card with gradient border
export const GradientCard: React.FC<CardProps> = ({
  children,
  onPress,
  style,
}) => {
  const Wrapper = onPress ? Pressable : View;

  return (
    <LinearGradient
      colors={COLORS.gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradientBorder, style]}
    >
      <Wrapper
        onPress={onPress}
        style={styles.gradientInner}
      >
        {children}
      </Wrapper>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.base,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  gradientBorder: {
    borderRadius: BORDER_RADIUS.xl,
    padding: 1,
  },
  gradientInner: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.xl - 1,
    padding: SPACING.base,
  },
});

