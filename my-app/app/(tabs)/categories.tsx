// Categories Screen with Mock Data
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { mockCategories } from '../../src/data/mockData';
import { COLORS } from '../../src/constants/theme';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48) / 2;

const getIconName = (slug: string): keyof typeof Ionicons.glyphMap => {
  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    party: 'musical-notes',
    concert: 'mic',
    meetup: 'people',
    exclusive: 'diamond',
    festival: 'sparkles',
    clubbing: 'disc',
  };
  return iconMap[slug] || 'apps';
};

export default function CategoriesScreen() {
  const router = useRouter();
  const colors = COLORS;

  const renderCategory = ({ item }: { item: typeof mockCategories[0] }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => router.push(`/category/${item.slug}`)}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={[item.color + '30', colors.background.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.categoryGradient, { borderColor: colors.border.subtle }]}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <Ionicons
            name={getIconName(item.slug)}
            size={32}
            color={item.color}
          />
        </View>

        <Text style={[styles.categoryName, { color: colors.text.primary }]}>{item.name}</Text>

        <View style={styles.countContainer}>
          <Text style={[styles.countText, { color: colors.text.tertiary }]}>{item.eventCount} events</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.text.tertiary} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text.primary }]}>Categories</Text>
          <Text style={[styles.subtitle, { color: colors.text.tertiary }]}>Explore events by your interests</Text>
        </View>
      </SafeAreaView>

      <FlatList
        data={mockCategories}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={renderCategory}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
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
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
  },
  categoryGradient: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countText: {
    fontSize: 13,
  },
});
