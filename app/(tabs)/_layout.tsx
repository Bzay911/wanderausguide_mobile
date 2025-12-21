import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="planScreen"
        options={{
          title: 'Plan',
          tabBarIcon: ({ color }) => <FontAwesome6 size={20} name="suitcase-rolling" color={color} />,
        }}
      />
      <Tabs.Screen
        name="saveScreen"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => <Fontisto size={20} name="favorite" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome6 size={20} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
