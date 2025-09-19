import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import ResponsiveButton from '../../components/ResponsiveButton';
import ResponsiveCard from '../../components/ResponsiveCard';
import ResponsiveContainer from '../../components/ResponsiveContainer';
import ResponsiveSpacing from '../../components/ResponsiveSpacing';
import ResponsiveText from '../../components/ResponsiveText';
import Header from '../../components/ui/Header';

export default function HomeScreen() {
  return (
    <ResponsiveContainer safeArea padding="none">
      <Header 
        title="ROSTILA" 
        showNotifications 
        onNotificationPress={() => router.push('/(stack)/notifications')}
      />
      
      <ScrollView className="flex-1 px-6">
        <ResponsiveSpacing size="lg" />
        
        <ResponsiveText variant="heading2" weight="bold">
          Welcome Back!
        </ResponsiveText>
        
        <ResponsiveSpacing size="sm" />
        
        <ResponsiveText variant="body" color="text-gray-600">
          Discover what's new in your dashboard
        </ResponsiveText>
        
        <ResponsiveSpacing size="lg" />
        
        {/* Quick Actions */}
        <ResponsiveCard padding="lg" shadow>
          <ResponsiveText variant="heading3" weight="medium">
            Quick Actions
          </ResponsiveText>
          
          <ResponsiveSpacing size="md" />
          
          <View className="flex-row justify-between">
            <ResponsiveButton
              title="Explore"
              onPress={() => router.push('/(tabs)/explore')}
              variant="primary"
              size="sm"
              className="flex-1 mr-2"
            />
            <ResponsiveButton
              title="Profile"
              onPress={() => router.push('/(tabs)/profile')}
              variant="outline"
              size="sm"
              className="flex-1 ml-2"
            />
          </View>
        </ResponsiveCard>
        
        <ResponsiveSpacing size="lg" />
        
        {/* Recent Activity */}
        <ResponsiveCard padding="lg" shadow>
          <ResponsiveText variant="heading3" weight="medium">
            Recent Activity
          </ResponsiveText>
          
          <ResponsiveSpacing size="sm" />
          
          <ResponsiveText variant="body" color="text-gray-600">
            No recent activity to show
          </ResponsiveText>
        </ResponsiveCard>
        
        <ResponsiveSpacing size="xl" />
      </ScrollView>
    </ResponsiveContainer>
  );
}