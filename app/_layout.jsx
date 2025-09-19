import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

// react query config 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Platform } from 'react-native';



// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});


export default function RootLayout() {
  return (
    <SafeAreaProvider>
       <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <Stack 
        screenOptions={{ 
          headerShown: false,
          // Add these options to prevent conflicts
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="splash" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="(auth)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="(stack)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="(modal)" 
          options={{ 
            presentation: 'modal',
            headerShown: false,
            animation: 'slide_from_bottom',
          }} 

        />
      </Stack>
       {Platform.OS === 'web' && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}