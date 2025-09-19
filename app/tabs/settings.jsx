import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import ResponsiveCard from '../../components/ResponsiveCard';
import ResponsiveContainer from '../../components/ResponsiveContainer';
import ResponsiveSpacing from '../../components/ResponsiveSpacing';
import ResponsiveText from '../../components/ResponsiveText';

const SettingsItem = ({ title, subtitle, icon, onPress, showArrow = true }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <View className="flex-row items-center py-4 px-2">
      <View className="w-8 h-8 rounded-full bg-blue-100 justify-center items-center mr-4">
        <Ionicons name={icon} size={18} color="#3B82F6" />
      </View>
      
      <View className="flex-1">
        <ResponsiveText variant="body" weight="medium">
          {title}
        </ResponsiveText>
        {subtitle && (
          <>
            <ResponsiveSpacing size="xs" />
            <ResponsiveText variant="caption" color="text-gray-600">
              {subtitle}
            </ResponsiveText>
          </>
        )}
      </View>
      
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </View>
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          title: 'Personal Information',
          subtitle: 'Update your details',
          icon: 'person-outline',
          onPress: () => router.push('/(stack)/details'),
        },
        {
          title: 'Privacy & Security',
          subtitle: 'Manage your privacy settings',
          icon: 'shield-outline',
          onPress: () => console.log('Privacy pressed'),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          title: 'Notifications',
          subtitle: 'Push notifications, email alerts',
          icon: 'notifications-outline',
          onPress: () => router.push('/(stack)/notifications'),
        },
        {
          title: 'Theme',
          subtitle: 'Dark mode, appearance',
          icon: 'color-palette-outline',
          onPress: () => console.log('Theme pressed'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Help Center',
          subtitle: 'FAQ, contact support',
          icon: 'help-circle-outline',
          onPress: () => console.log('Help pressed'),
        },
        {
          title: 'About',
          subtitle: 'Version, terms, privacy policy',
          icon: 'information-circle-outline',
          onPress: () => router.push('/(stack)/about'),
        },
      ],
    },
  ];

  return (
    <ResponsiveContainer safeArea padding="lg">
      <ResponsiveText variant="heading1" weight="bold">
        Settings
      </ResponsiveText>
      
      <ResponsiveSpacing size="lg" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex}>
            <ResponsiveText variant="heading3" weight="medium" color="text-gray-700">
              {group.title}
            </ResponsiveText>
            
            <ResponsiveSpacing size="sm" />
            
            <ResponsiveCard padding="none" shadow>
              {group.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  <SettingsItem {...item} />
                  {itemIndex < group.items.length - 1 && (
                    <View className="h-px bg-gray-200 ml-12" />
                  )}
                </View>
              ))}
            </ResponsiveCard>
            
            <ResponsiveSpacing size="lg" />
          </View>
        ))}
      </ScrollView>
    </ResponsiveContainer>
  );
}