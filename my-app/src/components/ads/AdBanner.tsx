import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import { COLORS } from '../../constants/theme';
import { Ad } from '../../types';

interface AdBannerProps {
  ad?: Ad;
  onPress?: (ad: Ad) => void;
}

const { width } = Dimensions.get('window');

export const AdBanner: React.FC<AdBannerProps> = ({ ad, onPress }) => {
  if (!ad) return null;

  const handlePress = () => {
    if (onPress) {
      onPress(ad);
    } else if (ad.targetUrl) {
      Linking.openURL(ad.targetUrl);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <Image source={{ uri: ad.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.adTag}>
        <Text style={styles.adTagText}>Ad</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 100, // Standard banner height
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.background.secondary,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  adTag: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  adTagText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
