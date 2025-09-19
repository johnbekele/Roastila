import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import ResponsiveButton from '../../components/ResponsiveButton';
import ResponsiveCard from '../../components/ResponsiveCard';
import ResponsiveContainer from '../../components/ResponsiveContainer';
import ResponsiveSpacing from '../../components/ResponsiveSpacing';
import ResponsiveText from '../../components/ResponsiveText';
import Avatar from '../../components/ui/Avatar';

export default function ProfileScreen() {
  return (
    <ResponsiveContainer safeArea padding="lg">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ResponsiveText variant="heading1" weight="bold">
          Profile
        </ResponsiveText>
        
        <ResponsiveSpacing size="lg" />
        
        {/* Profile Header */}
        <ResponsiveCard padding="lg" shadow>
          <View className="items-center">
            <Avatar size="large" />
            
            <ResponsiveSpacing size="md" />
            
            <ResponsiveText variant="heading3" weight="bold">
              John Doe
            </ResponsiveText>
            
            <ResponsiveSpacing size="xs" />
            
            <ResponsiveText variant="body" color="text-gray-600">
              john.doe@example.com
            </ResponsiveText>
            
            <ResponsiveSpacing size="lg" />
            
            <ResponsiveButton
              title="Edit Profile"
              onPress={() => router.push('/(stack)/details')}
              variant="primary"
              size="md"
              fullWidth
            />
          </View>
        </ResponsiveCard>
        
        <ResponsiveSpacing size="lg" />
        
        {/* Profile Stats */}
        <ResponsiveCard padding="lg" shadow>
          <ResponsiveText variant="heading3" weight="medium">
            Statistics
          </ResponsiveText>
          
          <ResponsiveSpacing size="md" />
          
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <ResponsiveText variant="heading2" weight="bold" color="text-blue-500">
                42
              </ResponsiveText>
              <ResponsiveText variant="caption" color="text-gray-600">
                Posts
              </ResponsiveText>
            </View>
            
            <View className="items-center flex-1">
              <ResponsiveText variant="heading2" weight="bold" color="text-blue-500">
                128
              </ResponsiveText>
              <ResponsiveText variant="caption" color="text-gray-600">
                Following
              </ResponsiveText>
            </View>
            
            <View className="items-center flex-1">
              <ResponsiveText variant="heading2" weight="bold" color="text-blue-500">
                256
              </ResponsiveText>
              <ResponsiveText variant="caption" color="text-gray-600">
                Followers
              </ResponsiveText>
            </View>
          </View>
        </ResponsiveCard>
        
        <ResponsiveSpacing size="xl" />
      </ScrollView>
    </ResponsiveContainer>
  );
}