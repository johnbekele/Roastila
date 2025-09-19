import { Image, View } from 'react-native';
import ResponsiveText from '../ResponsiveText';

export default function Avatar({ 
  source, 
  size = 'medium', 
  name = 'JD',
  className = '' 
}) {
  const sizeMap = {
    small: 'w-10 h-10',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
  };

  const textSizeMap = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-2xl',
  };

  return (
    <View className={`${sizeMap[size]} rounded-full bg-blue-500 justify-center items-center ${className}`}>
      {source ? (
        <Image source={source} className={`${sizeMap[size]} rounded-full`} />
      ) : (
        <ResponsiveText 
          variant="body" 
          weight="bold" 
          color="text-white"
          className={textSizeMap[size]}
        >
          {name}
        </ResponsiveText>
      )}
    </View>
  );
}