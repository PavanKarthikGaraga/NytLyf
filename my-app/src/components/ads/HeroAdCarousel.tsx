import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Linking,
    NativeSyntheticEvent,
    NativeScrollEvent,
    useWindowDimensions,
} from 'react-native';
import { COLORS } from '../../constants/theme';
import { Ad } from '../../types';

interface HeroAdCarouselProps {
    ads: Ad[];
    autoScroll?: boolean;
    interval?: number;
}

export const HeroAdCarousel: React.FC<HeroAdCarouselProps> = ({
    ads,
    autoScroll = true,
    interval = 5000
}) => {
    const { width } = useWindowDimensions(); // Responsive width
    const adWidth = width - 32;

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (!autoScroll || ads.length <= 1) return;

        const timer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % ads.length;
            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });
            setCurrentIndex(nextIndex);
        }, interval);

        return () => clearInterval(timer);
    }, [currentIndex, ads.length, autoScroll, interval]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        setCurrentIndex(index);
    };

    const handlePress = (ad: Ad) => {
        if (ad.targetUrl) {
            Linking.openURL(ad.targetUrl);
        }
    };

    const renderItem = ({ item }: { item: Ad }) => (
        <View style={[styles.slideContainer, { width }]}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handlePress(item)}
                style={[styles.slideContent, { width: adWidth }]}
            >
                <Image
                    source={{ uri: item.imageUrl }}
                    style={[styles.image, { width: adWidth }]}
                    resizeMode="cover"
                />
                <View style={styles.overlay}>
                    <View style={styles.adTag}>
                        <Text style={styles.adTagText}>Ad</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    if (!ads || ads.length === 0) return null;

    return (
        <View style={[styles.container, { width }]}>
            <FlatList
                ref={flatListRef}
                data={ads}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={width}
            />

            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {ads.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                backgroundColor:
                                    index === currentIndex
                                        ? COLORS.neon.pink
                                        : 'rgba(255, 255, 255, 0.3)',
                                width: index === currentIndex ? 20 : 8,
                            },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 220,
        marginBottom: 16,
    },
    slideContainer: {
        height: 220,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slideContent: {
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        height: 200,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    adTag: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
    },
    adTagText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '700',
    },
    pagination: {
        position: 'absolute',
        bottom: 16,
        flexDirection: 'row',
        alignSelf: 'center',
        gap: 6,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
});
