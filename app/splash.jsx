import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Device size detection
const isSmallDevice = screenHeight < 600;
const isMediumDevice = screenHeight >= 600 && screenHeight < 800;
const isLargeDevice = screenHeight >= 800;

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Dynamic sizing based on device
  const logoSize = isSmallDevice ? 80 : isMediumDevice ? 100 : 120;
  const appNameSize = isSmallDevice ? 28 : isMediumDevice ? 36 : 44;
  const taglineSize = isSmallDevice ? 14 : isMediumDevice ? 16 : 18;
  const horizontalPadding = screenWidth * 0.08; // 8% of screen width
  const verticalSpacing = screenHeight * 0.03; // 3% of screen height

  return (
    <View 
      className="flex-1 bg-blue-500 justify-center items-center"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: horizontalPadding,
      }}
    >
      <StatusBar backgroundColor="#3B82F6" barStyle="light-content" />
      
      <Animated.View
        className="items-center"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        {/* Logo Container - Responsive */}
        <View 
          className="rounded-full bg-white/20 justify-center items-center border-4 border-white/30"
          style={{
            width: logoSize,
            height: logoSize,
            marginBottom: verticalSpacing,
          }}
        >
          <Text 
            className="font-bold text-white"
            style={{ fontSize: logoSize * 0.4 }}
          >
            R
          </Text>
        </View>
        
        {/* App Name - Responsive */}
        <Text 
          className="font-bold text-white tracking-widest"
          style={{ 
            fontSize: appNameSize,
            marginBottom: verticalSpacing * 0.3,
          }}
        >
          ROSTILA
        </Text>
        
        {/* Tagline - Responsive */}
        <Text 
          className="text-white/80 text-center"
          style={{ 
            fontSize: taglineSize,
            marginBottom: verticalSpacing * 1.5,
            paddingHorizontal: screenWidth * 0.1,
          }}
        >
          Welcome to your app
        </Text>
        
        {/* Loading Dots - Responsive */}
        <View className="flex-row justify-center items-center">
          {[0, 1, 2].map((index) => (
            <View 
              key={index}
              className="rounded-full bg-white/60"
              style={{
                width: isSmallDevice ? 6 : 8,
                height: isSmallDevice ? 6 : 8,
                marginHorizontal: isSmallDevice ? 3 : 4,
              }}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
}