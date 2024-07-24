import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    'Kanit-Thin': require('./assets/fonts/Kanit-Thin.ttf'),
    'Kanit-ExtraLight': require('./assets/fonts/Kanit-ExtraLight.ttf'),
    'Kanit-Light': require('./assets/fonts/Kanit-Light.ttf'),
    'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf'),
    'Kanit-Medium': require('./assets/fonts/Kanit-Medium.ttf'),
    'Kanit-SemiBold': require('./assets/fonts/Kanit-SemiBold.ttf'),
    'Kanit-Bold': require('./assets/fonts/Kanit-Bold.ttf'),
    'Kanit-ExtraBold': require('./assets/fonts/Kanit-ExtraBold.ttf'),
    'Kanit-Black': require('./assets/fonts/Kanit-Black.ttf'),
  });

  return fontsLoaded;
}
