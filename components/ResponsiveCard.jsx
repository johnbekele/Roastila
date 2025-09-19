import { Dimensions, View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');
const isSmallDevice = screenHeight < 600;
const isMediumDevice = screenHeight >= 600 && screenHeight < 800;

export default function ResponsiveCard({
  children,
  className = '',
  padding = 'md',
  shadow = true,
  rounded = true,
}) {

  const getPaddingClasses = () => {
    const paddings = {
      sm: isSmallDevice ? 'p-3' : 'p-4',
      md: isSmallDevice ? 'p-4' : isMediumDevice ? 'p-5' : 'p-6',
      lg: isSmallDevice ? 'p-6' : isMediumDevice ? 'p-8' : 'p-10',
    };
    return paddings[padding];
  };

  const cardClasses = [
    'bg-white',
    getPaddingClasses(),
    rounded ? 'rounded-xl' : '',
    shadow ? 'shadow-lg' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <View className={cardClasses}>
      {children}
    </View>
  );
}