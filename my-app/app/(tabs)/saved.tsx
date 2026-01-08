// Saved Events Screen with Mock Data
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mockEvents, mockUser } from '../../src/data/mockData';
import { useTheme } from '../../src/contexts/ThemeContext';

export default function SavedScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  // Get saved events from mock data
  const savedEvents = mockEvents.filter(e =>
    mockUser.savedEvents.includes(e._id)
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const renderEvent = ({ item }: { item: typeof mockEvents[0] }) => (
    <TouchableOpacity
      style={[styles.eventCard, { backgroundColor: colors.background.secondary }]}
      onPress={() => router.push(`/event/${item._id}`)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.coverImage }} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <View style={[styles.smallBadge, { backgroundColor: item.category.color + '30' }]}>
          <Text style={[styles.smallBadgeText, { color: item.category.color }]}>
            {item.category.name}
          </Text>
        </View>
        <Text style={[styles.eventTitle, { color: colors.text.primary }]} numberOfLines={2}>{item.title}</Text>
        <View style={styles.eventMeta}>
          <Ionicons name="calendar-outline" size={12} color={colors.text.tertiary} />
          <Text style={[styles.eventMetaText, { color: colors.text.tertiary }]}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.eventMeta}>
          <Ionicons name="location-outline" size={12} color={colors.text.tertiary} />
          <Text style={[styles.eventMetaText, { color: colors.text.tertiary }]} numberOfLines={1}>{item.venue.name}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.removeBtn}>
        <Ionicons name="bookmark" size={20} color={colors.neon.pink} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.iconContainer, { backgroundColor: colors.background.secondary }]}>
        <Ionicons name="bookmark-outline" size={64} color={colors.text.tertiary} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>No saved events</Text>
      <Text style={[styles.emptyText, { color: colors.text.tertiary }]}>
        Tap the bookmark icon on any event to save it for later
      </Text>
      <TouchableOpacity
        style={[styles.exploreButton, { borderColor: colors.neon.pink }]}
        onPress={() => router.push('/(tabs)/explore')}
      >
        <Text style={[styles.exploreButtonText, { color: colors.neon.pink }]}>Explore Events</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text.primary }]}>Saved Events</Text>
          {savedEvents.length > 0 && (
            <Text style={[styles.count, { color: colors.text.tertiary }]}>{savedEvents.length} saved</Text>
          )}
        </View>
      </SafeAreaView>

      <FlatList
        data={savedEvents}
        keyExtractor={(item) => item._id}
        renderItem={renderEvent}
        contentContainerStyle={[
          styles.listContent,
          savedEvents.length === 0 && styles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  count: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  listContentEmpty: {
    flex: 1,
  },
  eventCard: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  eventImage: {
    width: 100,
    height: 120,
  },
  eventContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  smallBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 6,
  },
  smallBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  eventMetaText: {
    fontSize: 11,
  },
  removeBtn: {
    padding: 12,
    alignSelf: 'flex-start',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  exploreButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  exploreButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
