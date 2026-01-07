// Web stub for react-native-reanimated
// Provides minimal API compatibility for web platform

const noop = () => { };
const noopWithValue = (v) => v;
const identity = (x) => x;

// Worklet-related stubs
export const runOnJS = (fn) => fn;
export const runOnUI = (fn) => fn;
export const makeMutable = (value) => ({ value });
export const useSharedValue = (value) => ({ value });
export const useDerivedValue = (fn) => ({ value: fn() });
export const useAnimatedStyle = (fn) => fn();
export const useAnimatedScrollHandler = () => ({});
export const useAnimatedGestureHandler = () => ({});
export const useAnimatedReaction = noop;
export const useAnimatedProps = (fn) => fn();
export const useAnimatedRef = () => ({ current: null });
export const scrollTo = noop;
export const measure = () => null;

// Animation functions
export const withTiming = noopWithValue;
export const withSpring = noopWithValue;
export const withDecay = noopWithValue;
export const withDelay = (_, animation) => animation;
export const withSequence = (...animations) => animations[animations.length - 1];
export const withRepeat = (animation) => animation;
export const cancelAnimation = noop;
export const defineAnimation = identity;

// Easing
export const Easing = {
    linear: identity,
    ease: identity,
    quad: identity,
    cubic: identity,
    poly: () => identity,
    sin: identity,
    circle: identity,
    exp: identity,
    elastic: () => identity,
    back: () => identity,
    bounce: identity,
    bezier: () => identity,
    bezierFn: () => identity,
    steps: () => identity,
    in: identity,
    out: identity,
    inOut: identity,
};

// Interpolation
export const interpolate = (value, input, output) => {
    if (!input || !output || input.length < 2 || output.length < 2) return value;
    const idx = input.findIndex((v) => v >= value);
    if (idx <= 0) return output[0];
    if (idx >= output.length) return output[output.length - 1];
    const ratio = (value - input[idx - 1]) / (input[idx] - input[idx - 1]);
    return output[idx - 1] + ratio * (output[idx] - output[idx - 1]);
};

export const Extrapolate = {
    EXTEND: 'extend',
    CLAMP: 'clamp',
    IDENTITY: 'identity',
};

export const Extrapolation = Extrapolate;

// Color interpolation
export const interpolateColor = (value, inputRange, outputRange) => outputRange[0];
export const useInterpolateConfig = () => ({});

// Layout animations
export const Layout = { duration: noop };
export const FadeIn = { duration: noop };
export const FadeOut = { duration: noop };
export const FadeInUp = { duration: noop };
export const FadeInDown = { duration: noop };
export const FadeOutUp = { duration: noop };
export const FadeOutDown = { duration: noop };
export const SlideInLeft = { duration: noop };
export const SlideInRight = { duration: noop };
export const SlideOutLeft = { duration: noop };
export const SlideOutRight = { duration: noop };
export const ZoomIn = { duration: noop };
export const ZoomOut = { duration: noop };

// Create Animated component wrapper
const createAnimatedComponent = (Component) => Component;

// Animated components - passthrough for web
import { View, Text, Image, ScrollView, FlatList } from 'react-native';

export const Animated = {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    createAnimatedComponent,
};

// Default export
export default {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    createAnimatedComponent,
};
