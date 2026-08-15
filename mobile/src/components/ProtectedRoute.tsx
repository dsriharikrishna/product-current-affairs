import React, { useEffect, useState } from 'react';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { useAuthStore } from '../store/auth.store';
import { usePreferences } from '../features/users/hooks/useUsers';
import { useColorScheme } from 'nativewind';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const segments = useSegments();
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  
  const { data: pref } = usePreferences();
  const { setColorScheme } = useColorScheme();

  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (pref?.theme) {
      setColorScheme(pref.theme as any);
    }
  }, [pref?.theme, setColorScheme]);

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!accessToken && !inAuthGroup) {
      // Redirect to the sign-in page.
      router.replace('/(auth)/login');
    } else if (accessToken && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/(tabs)');
    }
    
    // We can show children after the first layout effect run
    setTimeout(() => setIsReady(true), 0);
  }, [accessToken, segments, router, rootNavigationState?.key]);

  if (!isReady) {
    return null; // Or a splash screen/loading spinner
  }

  return <>{children}</>;
}
