// Button Component - Dark Theme with Neon Accents
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'neon';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  const sizeStyles = {
    sm: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md },
    md: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg },
    lg: { paddingVertical: SPACING.base, paddingHorizontal: SPACING.xl },
  };

  const textSizes = {
    sm: TYPOGRAPHY.fontSize.sm,
    md: TYPOGRAPHY.fontSize.base,
    lg: TYPOGRAPHY.fontSize.md,
  };

  const getButtonStyle = (): ViewStyle => {
    const base: ViewStyle = {
      ...sizeStyles[size],
      borderRadius: BORDER_RADIUS.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: SPACING.sm,
      opacity: isDisabled ? 0.5 : 1,
    };

    if (fullWidth) {
      base.width = '100%';
    }

    switch (variant) {
      case 'secondary':
        return { ...base, backgroundColor: COLORS.background.tertiary };
      case 'outline':
        return {
          ...base,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: COLORS.neon.pink,
        };
      case 'ghost':
        return { ...base, backgroundColor: 'transparent' };
      case 'neon':
        return { ...base }; // Gradient handled separately
      default:
        return { ...base, backgroundColor: COLORS.neon.pink };
    }
  };

  const getTextStyle = (): TextStyle => {
    const base: TextStyle = {
      fontSize: textSizes[size],
      fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    };

    switch (variant) {
      case 'outline':
        return { ...base, color: COLORS.neon.pink };
      case 'ghost':
        return { ...base, color: COLORS.text.secondary };
      default:
        return { ...base, color: COLORS.text.primary };
    }
  };

  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? COLORS.neon.pink : COLORS.text.primary}
        />
      ) : (
        <>
          {leftIcon}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {rightIcon}
        </>
      )}
    </>
  );

  if (variant === 'neon') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
        style={[fullWidth && { width: '100%' }, style]}
      >
        <LinearGradient
          colors={COLORS.gradients.primary as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[getButtonStyle(), styles.neonGlow]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[getButtonStyle(), style]}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  neonGlow: {
    shadowColor: COLORS.neon.pink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});

