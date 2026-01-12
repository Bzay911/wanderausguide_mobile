import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle:{
          backgroundColor: "#000"
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused, color }) => <Ionicons name={focused? "grid" : "grid-outline"} size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="planScreen"
        options={{
          title: 'Plan',
          tabBarIcon: ({ focused, color }) => <Ionicons name={focused? "calendar" : "calendar-outline"} size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="saveScreen"
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused, color }) => <Ionicons name={focused? "bookmark" : "bookmark-outline"} size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({focused, color }) => <Ionicons name={focused? "person" : "person-outline"} size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}
