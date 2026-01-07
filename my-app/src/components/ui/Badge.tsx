// Badge Component - Dark Theme with Neon Accents
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants/theme';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'neon' | 'outline';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'default',
  size = 'sm',
  icon,
  style,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: `${COLORS.status.success}20`, text: COLORS.status.success };
      case 'warning':
        return { bg: `${COLORS.status.warning}20`, text: COLORS.status.warning };
      case 'error':
        return { bg: `${COLORS.status.error}20`, text: COLORS.status.error };
      case 'info':
        return { bg: `${COLORS.status.info}20`, text: COLORS.status.info };
      case 'outline':
        return { bg: 'transparent', text: COLORS.neon.pink, border: COLORS.neon.pink };
      case 'neon':
        return { bg: `${COLORS.neon.pink}20`, text: COLORS.neon.pink };
      default:
        return { bg: COLORS.background.tertiary, text: COLORS.text.secondary };
    }
  };

  const colors = getColors();
  const isSmall = size === 'sm';

  const containerStyle: ViewStyle = {
    backgroundColor: colors.bg,
    paddingHorizontal: isSmall ? SPACING.sm : SPACING.md,
    paddingVertical: isSmall ? SPACING.xs : SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    ...(colors.border && { borderWidth: 1, borderColor: colors.border }),
  };

  return (
    <View style={[containerStyle, style]}>
      {icon && (
        <Ionicons
          name={icon}
          size={isSmall ? 10 : 12}
          color={colors.text}
        />
      )}
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontSize: isSmall ? TYPOGRAPHY.fontSize.xs : TYPOGRAPHY.fontSize.sm,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

// Live Badge with pulsing animation
export const LiveBadge: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  return (
    <LinearGradient
      colors={COLORS.gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.liveBadge, style]}
    >
      <View style={styles.liveDot} />
      <Text style={styles.liveText}>LIVE</Text>
    </LinearGradient>
  );
};

// Price Badge
export const PriceBadge: React.FC<{
  price: number;
  isFree?: boolean;
  style?: ViewStyle;
}> = ({ price, isFree, style }) => {
  if (isFree) {
    return (
      <Badge
        text="FREE"
        variant="success"
        icon="ticket-outline"
        style={style}
      />
    );
  }

  return (
    <View style={[styles.priceBadge, style]}>
      <Text style={styles.priceSymbol}>₹</Text>
      <Text style={styles.priceText}>{price}</Text>
      <Text style={styles.priceLabel}>onwards</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    gap: SPACING.xs,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.text.primary,
  },
  liveText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
    letterSpacing: 1,
  },
  priceBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: COLORS.background.tertiary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  priceSymbol: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.neon.green,
  },
  priceText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
  },
  priceLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: COLORS.text.tertiary,
    marginLeft: SPACING.xs,
  },
});

