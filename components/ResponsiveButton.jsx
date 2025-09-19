import { ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import ResponsiveText from './ResponsiveText';

const { height: screenHeight } = Dimensions.get('window');
const isSmallDevice = screenHeight < 600;
const isMediumDevice = screenHeight >= 600 && screenHeight < 800;

export default function ResponsiveButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false,
}) {

  const getVariantClasses = () => {
    const variants = {
      primary: 'bg-blue-500 active:bg-blue-600',
      secondary: 'bg-gray-500 active:bg-gray-600',
      outline: 'border-2 border-blue-500 bg-transparent active:bg-blue-50',
      ghost: 'bg-transparent active:bg-gray-100',
    };
    return variants[variant];
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: isSmallDevice ? 'px-3 py-2' : 'px-4 py-2',
      md: isSmallDevice ? 'px-4 py-3' : isMediumDevice ? 'px-6 py-3' : 'px-8 py-4',
      lg: isSmallDevice ? 'px-6 py-4' : isMediumDevice ? 'px-8 py-4' : 'px-10 py-5',
    };
    return sizes[size];
  };

  const getTextColor = () => {
    return variant === 'outline' || variant === 'ghost' ? 'text-blue-500' : 'text-white';
  };

  const buttonClasses = [
    'rounded-lg justify-center items-center',
    getVariantClasses(),
    getSizeClasses(),
    fullWidth ? 'w-full' : 'self-start',
    disabled ? 'opacity-50' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor().includes('white') ? '#fff' : '#3B82F6'} />
      ) : (
        <ResponsiveText
          variant="button"
          weight="medium"
          color={getTextColor()}
        >
          {title}
        </ResponsiveText>
      )}
    </TouchableOpacity>
  );
}