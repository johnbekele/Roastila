import { Dimensions, View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');
const isSmallDevice = screenHeight < 600;
const isMediumDevice = screenHeight >= 600 && screenHeight < 800;

export default function ResponsiveSpacing({
  size = 'md',
  direction = 'vertical',
}) {

  const getSpacingClasses = () => {
    const spacings = {
      xs: isSmallDevice ? 'h-1 w-1' : 'h-2 w-2',
      sm: isSmallDevice ? 'h-2 w-2' : 'h-3 w-3',
      md: isSmallDevice ? 'h-4 w-4' : isMediumDevice ? 'h-5 w-5' : 'h-6 w-6',
      lg: isSmallDevice ? 'h-6 w-6' : isMediumDevice ? 'h-8 w-8' : 'h-10 w-10',
      xl: isSmallDevice ? 'h-8 w-8' : isMediumDevice ? 'h-12 w-12' : 'h-16 w-16',
      '2xl': isSmallDevice ? 'h-12 w-12' : isMediumDevice ? 'h-16 w-16' : 'h-20 w-20',
    };
    return spacings[size];
  };

  return <View className={getSpacingClasses()} />;
}