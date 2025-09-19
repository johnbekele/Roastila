import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ResponsiveButton from '../components/ResponsiveButton';
import ResponsiveCard from '../components/ResponsiveCard';
import ResponsiveContainer from '../components/ResponsiveContainer';
import ResponsiveSpacing from '../components/ResponsiveSpacing';
import ResponsiveText from '../components/ResponsiveText';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ResponsiveContainer safeArea padding="lg">
      <ResponsiveText variant="heading1" weight="bold" align="center">
        Welcome to ROSTILA!
      </ResponsiveText>
      
      <ResponsiveSpacing size="lg" />
      
      <ResponsiveCard padding="lg" shadow>
        <ResponsiveText variant="heading3" weight="medium">
          Getting Started
        </ResponsiveText>
        
        <ResponsiveSpacing size="sm" />
        
        <ResponsiveText variant="body" color="text-gray-600">
          This is your responsive home screen. All components automatically 
          adapt to different screen sizes and handle safe areas properly.
        </ResponsiveText>
        
        <ResponsiveSpacing size="lg" />
        
        <ResponsiveButton
          title="Get Started"
          onPress={() => console.log('Button pressed')}
          variant="primary"
          size="lg"
          fullWidth
        />
      </ResponsiveCard>
      
      <ResponsiveSpacing size="xl" />
      
      <ResponsiveButton
        title="Learn More"
        onPress={() => console.log('Learn more')}
        variant="outline"
        size="md"
        fullWidth
      />

      {/* Debug info - remove in production */}
      <View className="mt-8 p-4 bg-gray-100 rounded-lg">
        <Text className="text-xs text-gray-500">
          Safe Area Insets: Top: {insets.top}, Bottom: {insets.bottom}
        </Text>
      </View>
    </ResponsiveContainer>
  );
}