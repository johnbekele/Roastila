import { Dimensions, Text } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');
const isSmallDevice = screenHeight < 600;
const isMediumDevice = screenHeight >= 600 && screenHeight < 800;

export default function ResponsiveText({
  children,
  variant = 'body',
  className = '',
  color = 'text-gray-900',
  weight = 'normal',
  align = 'left',
}) {
  
  const getVariantClasses = () => {
    const variants = {
      heading1: isSmallDevice ? 'text-2xl' : isMediumDevice ? 'text-3xl' : 'text-4xl',
      heading2: isSmallDevice ? 'text-xl' : isMediumDevice ? 'text-2xl' : 'text-3xl',
      heading3: isSmallDevice ? 'text-lg' : isMediumDevice ? 'text-xl' : 'text-2xl',
      body: isSmallDevice ? 'text-sm' : isMediumDevice ? 'text-base' : 'text-lg',
      caption: isSmallDevice ? 'text-xs' : isMediumDevice ? 'text-sm' : 'text-base',
      button: isSmallDevice ? 'text-sm' : isMediumDevice ? 'text-base' : 'text-lg',
    };
    return variants[variant];
  };

  const getWeightClass = () => {
    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    };
    return weights[weight];
  };

  const getAlignClass = () => {
    const alignments = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };
    return alignments[align];
  };

  const textClasses = [
    getVariantClasses(),
    getWeightClass(),
    getAlignClass(),
    color,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Text className={textClasses}>
      {children}
    </Text>
  );
}