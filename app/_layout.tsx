import { Palette } from '@/constants/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';

const queryClient = new QueryClient();

// VoiceMap custom Paper dark theme
const voiceMapTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Palette.violet,
    secondary: Palette.violetLight,
    background: Palette.deepNavy,
    surface: Palette.navySurface,
    surfaceVariant: Palette.navyCard,
    error: Palette.danger,
    onPrimary: '#FFFFFF',
    onBackground: '#ECEDEE',
    onSurface: '#ECEDEE',
    elevation: {
      ...MD3DarkTheme.colors.elevation,
      level0: Palette.deepNavy,
      level1: Palette.navySurface,
      level2: Palette.navyCard,
      level3: '#1F2D44',
      level4: '#243350',
      level5: '#293A5C',
    },
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={voiceMapTheme}>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="review-detail" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="alert-detail" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="competitor" options={{ presentation: 'card', headerShown: false }} />
          </Stack>
        </PaperProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
