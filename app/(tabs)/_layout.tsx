import React from 'react';
import { Tabs } from 'expo-router';
import { Icon } from '../../components/Icon';
import { Colors } from '../../constants/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderTopWidth: 1,
          borderTopColor: '#F1F5F9',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingTop: 4,
          paddingBottom: 8,
          height: 60,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors['slate-400'],
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Icon name="plus-circle" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <Icon name="clock" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="drafts"
        options={{
          title: 'Drafts',
          tabBarIcon: ({ color, size }) => (
            <Icon name="file-text" size={20} color={color} />
          ),
          tabBarBadge: undefined as any,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
