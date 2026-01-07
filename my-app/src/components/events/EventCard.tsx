// EventCard Component - Main event card used in lists
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Event } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Badge, PriceBadge } from '../ui';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - SPACING.base * 2;

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'compact' | 'featured';
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  variant = 'default'
}) => {
  const router = useRouter();
  const [isSaved, setIsSaved] = React.useState(false);

  const handlePress = () => {
    router.push(`/event/${event._id}`);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={styles.compactCard}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: event.coverImage }}
          style={styles.compactImage}
        />
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle} numberOfLines={2}>
            {event.title}
          </Text>
          <View style={styles.compactMeta}>
            <Ionicons
              name="calendar-outline"
              size={12}
              color={COLORS.text.tertiary}
            />
            <Text style={styles.compactMetaText}>{formatDate(event.date)}</Text>
          </View>
          <View style={styles.compactMeta}>
            <Ionicons
              name="location-outline"
              size={12}
              color={COLORS.text.tertiary}
            />
            <Text style={styles.compactMetaText} numberOfLines={1}>
              {event.venue.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === 'featured') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={styles.featuredCard}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: event.coverImage }}
          style={styles.featuredImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.featuredGradient}
        >
          <View style={styles.featuredBadges}>
            {event.isTrending && (
              <Badge text="Trending" variant="neon" icon="flame" />
            )}
            {event.isExclusive && (
              <Badge text="Exclusive" variant="warning" icon="diamond" />
            )}
          </View>

          <View style={styles.featuredContent}>
            <Badge
              text={event.category.name}
              variant="default"
              style={{ alignSelf: 'flex-start' }}
            />
            <Text style={styles.featuredTitle} numberOfLines={2}>
              {event.title}
            </Text>

            <View style={styles.featuredMeta}>
              <View style={styles.metaRow}>
                <Ionicons
                  name="calendar"
                  size={14}
                  color={COLORS.neon.pink}
                />
                <Text style={styles.metaText}>
                  {formatDate(event.date)} • {formatTime(event.startTime)}
                </Text>
              </View>
              <View style={styles.metaRow}>
                <Ionicons
                  name="location"
                  size={14}
                  color={COLORS.neon.blue}
                />
                <Text style={styles.metaText}>{event.venue.name}</Text>
              </View>
            </View>

            <View style={styles.featuredFooter}>
              <PriceBadge
                price={event.pricing.startingPrice || 0}
                isFree={event.pricing.isFree}
              />
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Ionicons
                  name={isSaved ? 'bookmark' : 'bookmark-outline'}
                  size={24}
                  color={isSaved ? COLORS.neon.pink : COLORS.text.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Default variant
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.defaultCard}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.coverImage }}
          style={styles.defaultImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.imageGradient}
        />
        <View style={styles.topBadges}>
          <Badge text={event.category.name} variant="default" />
          {event.isTrending && (
            <Badge text="Hot" variant="error" icon="flame" size="sm" />
          )}
        </View>
        <TouchableOpacity onPress={handleSave} style={styles.saveButtonFloat}>
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={isSaved ? COLORS.neon.pink : COLORS.text.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.defaultContent}>
        <Text style={styles.defaultTitle} numberOfLines={2}>
          {event.title}
        </Text>

        <View style={styles.defaultMeta}>
          <View style={styles.metaRow}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={COLORS.text.tertiary}
            />
            <Text style={styles.metaTextSmall}>
              {formatDate(event.date)} • {formatTime(event.startTime)}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={COLORS.text.tertiary}
            />
            <Text style={styles.metaTextSmall} numberOfLines={1}>
              {event.venue.name}, {event.venue.area}
            </Text>
          </View>
        </View>

        <View style={styles.defaultFooter}>
          <PriceBadge
            price={event.pricing.startingPrice || 0}
            isFree={event.pricing.isFree}
          />
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Ionicons name="eye-outline" size={12} color={COLORS.text.tertiary} />
              <Text style={styles.statText}>{event.viewCount}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="bookmark-outline" size={12} color={COLORS.text.tertiary} />
              <Text style={styles.statText}>{event.saveCount}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Compact variant styles
  compactCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  compactImage: {
    width: 80,
    height: 80,
  },
  compactContent: {
    flex: 1,
    padding: SPACING.sm,
    justifyContent: 'center',
  },
  compactTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  compactMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  compactMetaText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: COLORS.text.tertiary,
  },

  // Featured variant styles
  featuredCard: {
    width: CARD_WIDTH,
    height: 280,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'space-between',
    padding: SPACING.base,
  },
  featuredBadges: {
    flexDirection: 'row',
    gap: SPACING.sm,
    alignSelf: 'flex-end',
  },
  featuredContent: {
    gap: SPACING.xs,
  },
  featuredTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
    lineHeight: 26,
  },
  featuredMeta: {
    gap: SPACING.xs,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },

  // Default variant styles
  defaultCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  defaultImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  topBadges: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  saveButtonFloat: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultContent: {
    padding: SPACING.md,
  },
  defaultTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  defaultMeta: {
    gap: SPACING.xs,
    marginBottom: SPACING.md,
  },
  defaultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Shared styles
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  metaText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.text.secondary,
  },
  metaTextSmall: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: COLORS.text.tertiary,
  },
  saveButton: {
    padding: SPACING.xs,
  },
  stats: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  statText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: COLORS.text.tertiary,
  },
});

