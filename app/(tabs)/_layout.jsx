import { HapticTab } from '@/components/HapticTab';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Dimensions, Text } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TabLayout() {
  const TAB_HEIGHT = SCREEN_HEIGHT * 0.09;
  const ICON_SIZE = SCREEN_WIDTH * 0.065;
  const LABEL_FONT = SCREEN_WIDTH * 0.033;
  const LABEL_MARGIN_TOP = SCREEN_HEIGHT * 0.003;

  const ACTIVE_COLOR = '#10B981'; // Green
  const INACTIVE_COLOR = '#9CA3AF'; // Gray
  const TAB_BG_COLOR = '#ffffff';
  const TAB_SHADOW = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  };

  const getTabOptions = (iconName, label) => ({
    tabBarButton: HapticTab,
    tabBarStyle: {
      position: 'absolute',
      bottom: SCREEN_HEIGHT * 0.02, // নিচ থেকে উপরে
      left: SCREEN_WIDTH * 0.03,   // ডান-বাম margin
      right: SCREEN_WIDTH * 0.03,
      backgroundColor: TAB_BG_COLOR,
      height: TAB_HEIGHT,
      paddingBottom: TAB_HEIGHT * 0.15,
      borderRadius: TAB_HEIGHT / 2, // পুরো rounded
      ...TAB_SHADOW,
    },
    tabBarIcon: ({ focused }) => (
      <MaterialCommunityIcons
        name={iconName}
        size={ICON_SIZE}
        color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
      />
    ),
    tabBarLabel: ({ focused }) => (
      <Text
        style={{
          fontSize: LABEL_FONT,
          color: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
          fontWeight: focused ? '700' : '500',
          marginTop: LABEL_MARGIN_TOP,
        }}
      >
        {label}
      </Text>
    ),
    headerShown: false,
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen name="home" options={getTabOptions('home', 'হোম')} />
      <Tabs.Screen name="amol" options={getTabOptions('calendar-today', 'দৈনিক-আমল')} />
      <Tabs.Screen name="quranpage" options={getTabOptions('book-open-page-variant', 'কুরআন')} />
      <Tabs.Screen name="aboutapp" options={getTabOptions('information', 'অ্যাপ সম্পর্কে')} />
    </Tabs>
  );
}
