import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Device size detection
const isSmallDevice = screenHeight < 600;
const isMediumDevice = screenHeight >= 600 && screenHeight < 800;
const isLargeDevice = screenHeight >= 800;

export default function ResponsiveContainer({
  children,
  className = '',
  safeArea = true,
  centerContent = false,
  padding = 'md',
  backgroundColor = 'bg-white',
}) {
  const insets = useSafeAreaInsets();

  // Percentage-based padding for better responsiveness
  const getPaddingStyle = () => {
    const paddingMap = {
      none: 0,
      xs: screenWidth * 0.02, // 2% of screen width
      sm: screenWidth * 0.04, // 4% of screen width
      md: screenWidth * 0.06, // 6% of screen width
      lg: screenWidth * 0.08, // 8% of screen width
      xl: screenWidth * 0.12, // 12% of screen width
    };
    return paddingMap[padding];
  };

  const containerClasses = [
    'flex-1',
    backgroundColor,
    centerContent ? 'justify-center items-center' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <View 
      className={containerClasses}
      style={{
        paddingTop: safeArea ? insets.top : 0,
        paddingBottom: safeArea ? insets.bottom : 0,
        paddingHorizontal: getPaddingStyle(),
      }}
    >
      {children}
    </View>
  );
}