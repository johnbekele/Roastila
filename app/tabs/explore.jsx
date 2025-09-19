import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import ResponsiveCard from '../../components/ResponsiveCard';
import ResponsiveContainer from '../../components/ResponsiveContainer';
import ResponsiveSpacing from '../../components/ResponsiveSpacing';
import ResponsiveText from '../../components/ResponsiveText';
import SearchBar from '../../components/ui/SearchBar';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const exploreItems = [
    { id: 1, title: 'Trending Topics', subtitle: 'What\'s popular today' },
    { id: 2, title: 'New Features', subtitle: 'Latest updates and improvements' },
    { id: 3, title: 'Community', subtitle: 'Connect with other users' },
    { id: 4, title: 'Help Center', subtitle: 'Get support and answers' },
  ];

  return (
    <ResponsiveContainer safeArea padding="lg">
      <ResponsiveText variant="heading1" weight="bold">
        Explore
      </ResponsiveText>
      
      <ResponsiveSpacing size="lg" />
      
      <SearchBar
        placeholder="Search for anything..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      <ResponsiveSpacing size="lg" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {exploreItems.map((item) => (
          <View key={item.id}>
            <ResponsiveCard padding="lg" shadow>
              <ResponsiveText variant="heading3" weight="medium">
                {item.title}
              </ResponsiveText>
              
              <ResponsiveSpacing size="xs" />
              
              <ResponsiveText variant="body" color="text-gray-600">
                {item.subtitle}
              </ResponsiveText>
            </ResponsiveCard>
            
            <ResponsiveSpacing size="md" />
          </View>
        ))}
      </ScrollView>
    </ResponsiveContainer>
  );
}