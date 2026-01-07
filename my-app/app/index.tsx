// App Entry - Redirect to appropriate screen
import { Redirect } from 'expo-router';

export default function Index() {
  // For now, redirect directly to tabs (skip auth for demo)
  return <Redirect href="/(tabs)/home" />;
}

