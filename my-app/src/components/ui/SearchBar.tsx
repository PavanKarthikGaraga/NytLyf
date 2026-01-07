// SearchBar Component - Dark Theme with Neon Accents
import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmit?: () => void;
  onClear?: () => void;
  autoFocus?: boolean;
  showFilterButton?: boolean;
  onFilterPress?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search events, venues...',
  onFocus,
  onBlur,
  onSubmit,
  onClear,
  autoFocus = false,
  showFilterButton = false,
  onFilterPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  const handleClear = useCallback(() => {
    onChangeText('');
    onClear?.();
  }, [onChangeText, onClear]);

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, isFocused && styles.searchContainerFocused]}>
        <Ionicons
          name="search"
          size={20}
          color={isFocused ? COLORS.neon.pink : COLORS.text.tertiary}
          style={styles.searchIcon}
        />
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text.muted}
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={onSubmit}
          autoFocus={autoFocus}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons
              name="close-circle"
              size={18}
              color={COLORS.text.tertiary}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {showFilterButton && (
        <TouchableOpacity
          onPress={onFilterPress}
          style={[styles.filterButton, isFocused && styles.filterButtonFocused]}
        >
          <Ionicons
            name="options"
            size={20}
            color={COLORS.text.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
    paddingHorizontal: SPACING.md,
    height: 48,
  },
  searchContainerFocused: {
    borderColor: COLORS.neon.pink,
    backgroundColor: COLORS.background.tertiary,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: COLORS.text.primary,
    paddingVertical: 0,
  },
  clearButton: {
    padding: SPACING.xs,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  filterButtonFocused: {
    borderColor: COLORS.neon.purple,
  },
});

