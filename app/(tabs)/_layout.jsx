// app/_layout.js বা TabLayout.jsx
import { HapticTab } from '@/components/HapticTab';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  // Responsive sizes
  const ICON_SIZE = SCREEN_WIDTH * 0.07;    // Icon responsive to width
  const LABEL_FONT = SCREEN_WIDTH * 0.035;  // Label font responsive to width
  const TAB_HEIGHT = SCREEN_HEIGHT * 0.08 + insets.bottom; // Tab height + safe area

  const ACTIVE_COLOR = '#FFFFFF';
  const INACTIVE_COLOR = '#FFFFFF';

  const getTabOptions = (iconName, label) => ({
    tabBarButton: HapticTab,
    tabBarIcon: ({ focused }) => {
      const scale = useRef(new Animated.Value(1)).current;

      useEffect(() => {
        Animated.spring(scale, {
          toValue: focused ? 1.2 : 1,
          useNativeDriver: true,
          friction: 4,
        }).start();
      }, [focused]);

      return (
        <Animated.View style={{ transform: [{ scale }] }}>
          <MaterialCommunityIcons
            name={iconName}
            size={ICON_SIZE}
            color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
          />
        </Animated.View>
      );
    },
    tabBarLabel: ({ focused }) => (
      <Text
        style={{
          fontSize: LABEL_FONT,
          color: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
          fontWeight: focused ? 'bold' : 'normal',
        }}
      >
        {label}
      </Text>
    ),
    headerShown: false,
    tabBarStyle: {
      height: TAB_HEIGHT,
      borderTopWidth: 0,
      elevation: 10, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      backgroundColor: 'transparent', // Gradient দেখানোর জন্য
      position: 'absolute',
    },
    tabBarBackground: () => (
      <LinearGradient
      colors={['#5c9b2fff', '#5a894dff','#361e9dff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      />
    ),
  });

  return (
    <Tabs screenOptions={{ tabBarShowLabel: true }}>
      <Tabs.Screen name="home" options={getTabOptions('home', 'হোম')} />
      <Tabs.Screen name="quranpage" options={getTabOptions('book-open-variant', 'কুরআন')} />
      <Tabs.Screen name="bookmark" options={getTabOptions('bookmark-multiple', 'বুকমার্ক')} />
      <Tabs.Screen name="aboutapp" options={getTabOptions('information', 'অ্যাপ')} />
    </Tabs>
  );
}
