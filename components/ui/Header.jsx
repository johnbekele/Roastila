import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import ResponsiveText from '../ResponsiveText';

export default function Header({ 
  title, 
  showBack = false, 
  showNotifications = false, 
  onBackPress, 
  onNotificationPress 
}) {
  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      {showBack ? (
        <TouchableOpacity onPress={onBackPress} className="p-2">
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}
      
      <ResponsiveText variant="heading3" weight="bold">
        {title}
      </ResponsiveText>
      
      {showNotifications ? (
        <TouchableOpacity onPress={onNotificationPress} className="p-2">
          <Ionicons name="notifications-outline" size={24} color="#374151" />
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}
    </View>
  );
}