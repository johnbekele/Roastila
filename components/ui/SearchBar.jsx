import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

export default function SearchBar({ placeholder, value, onChangeText, ...props }) {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
      <Ionicons name="search" size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 ml-3 text-base text-gray-900"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
}