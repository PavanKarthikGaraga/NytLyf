// CategoryCard Component - For category grid display
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Category } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { ICONS } from '../../constants/icons';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - SPACING.base * 3) / 2;

interface CategoryCardProps {
  category: Category;
  variant?: 'grid' | 'chip';
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  variant = 'grid' 
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/category/${category.slug}`);
  };

  const getIconName = (categoryName: string): keyof typeof Ionicons.glyphMap => {
    const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
      party: 'musical-notes',
      concert: 'mic',
      meetup: 'people',
      exclusive: 'diamond',
      festival: 'sparkles',
      clubbing: 'disc',
      rooftop: 'sunny',
      'live-music': 'radio',
      comedy: 'happy',
      networking: 'git-network',
    };
    return iconMap[categoryName.toLowerCase()] || 'apps';
  };

  if (variant === 'chip') {
    return (
      <TouchableOpacity 
        onPress={handlePress} 
        style={[
          styles.chipContainer,
          { borderColor: category.color || COLORS.neon.pink }
        ]}
        activeOpacity={0.8}
      >
        <Ionicons
          name={getIconName(category.slug)}
          size={16}
          color={category.color || COLORS.neon.pink}
        />
        <Text style={[styles.chipText, { color: category.color || COLORS.text.primary }]}>
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  }

  // Grid variant
  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={styles.gridContainer}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={[
          `${category.color || COLORS.neon.pink}30`,
          COLORS.background.secondary,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gridGradient}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${category.color}20` }]}>
          <Ionicons
            name={getIconName(category.slug)}
            size={32}
            color={category.color || COLORS.neon.pink}
          />
        </View>
        
        <Text style={styles.gridTitle}>{category.name}</Text>
        
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            {category.eventCount} events
          </Text>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={COLORS.text.tertiary}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Quick Category Filter Chip
export const QuickCategoryChip: React.FC<{
  category: Category;
  isSelected?: boolean;
  onPress: () => void;
}> = ({ category, isSelected, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.quickChip,
        isSelected && { 
          backgroundColor: category.color || COLORS.neon.pink,
          borderColor: category.color || COLORS.neon.pink,
        }
      ]}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.quickChipText,
        isSelected && { color: COLORS.text.primary }
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Grid variant styles
  gridContainer: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    marginBottom: SPACING.base,
  },
  gridGradient: {
    flex: 1,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.base,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    color: COLORS.text.primary,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: COLORS.text.tertiary,
  },

  // Chip variant styles
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    backgroundColor: COLORS.background.secondary,
  },
  chipText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },

  // Quick chip styles
  quickChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border.default,
    backgroundColor: COLORS.background.secondary,
    marginRight: SPACING.sm,
  },
  quickChipText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.text.secondary,
  },
});

