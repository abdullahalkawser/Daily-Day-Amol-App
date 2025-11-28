import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import SafeLinearGradient from '../components/SafeLinearGradient'

import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

// --- Updated Data with a richer color scheme ---
const onboardingSlides = [
  { key: '1', icon: '🕌', title: 'আপনার দ্বীনি যাত্রায় স্বাগতম', description: 'আপনার দৈনন্দিন ইবাদতের জন্য একটি আধুনিক এবং সহজ সমাধান।', colors: ['#007a4a', '#004d30'] },
  { key: '2', icon: '🕋', title: 'সঠিক নামাজের সময়', description: 'আপনার অবস্থান অনুযায়ী নামাজের সঠিক সময়সূচী পান এবং জামাতের জন্য প্রস্তুত থাকুন।', colors: ['#006400', '#004000'] },
  { key: '3', icon: '📖', title: 'দৈনিক হাদিস ও দোয়া', description: 'প্রতিদিন একটি নতুন হাদিস পড়ুন এবং আপনার জ্ঞান বৃদ্ধি করুন।', colors: ['#38761d', '#1d410b'] }
];

// --- Improved Onboarding Item Component with Animation ---
const OnboardingItem = ({ item, index, scrollX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  // Scale animation for the icon and text
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.7, 1, 0.7],
    extrapolate: 'clamp',
  });

  // Opacity animation for the icon and text
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.4, 1, 0.4],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.slide}>
      <Animated.View style={[styles.iconContainer, { transform: [{ scale }], opacity }]}>
        <Text style={styles.icon}>{item.icon}</Text>
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity }]}>
        {item.title}
      </Animated.Text>
      <Animated.Text style={[styles.description, { opacity }]}>
        {item.description}
      </Animated.Text>
    </View>
  );
};

// --- Pagination Component (Remains largely the same, but with updated styling) ---
const Pagination = ({ data, scrollX }) => (
  <View style={styles.paginationContainer}>
    {data.map((_, idx) => {
      const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
      const dotWidth = scrollX.interpolate({ inputRange, outputRange: [10, 25, 10], extrapolate: 'clamp' });
      const opacity = scrollX.interpolate({ inputRange, outputRange: [0.4, 1, 0.4], extrapolate: 'clamp' });
      return <Animated.View key={idx.toString()} style={[styles.dot, { width: dotWidth, opacity }]} />;
    })}
  </View>
);

// --- Main Onboarding Screen Component ---
const OnboardingScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  // Background Gradient Color Interpolation
  const backgroundColor = scrollX.interpolate({
    inputRange: onboardingSlides.map((_, i) => i * width),
    outputRange: onboardingSlides.map(slide => slide.colors[0]), // Using the start color for interpolation
    extrapolate: 'clamp',
  });

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Navigate to home/main screen
      router.replace('/(tabs)/home'); 
      // Optional: Show a toast message on completion
      Toast.show({ type: 'success', text1: 'স্বাগতম!', text2: 'আপনার যাত্রা শুরু হলো।' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Background Gradient */}
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor }]}>
        <SafeLinearGradient 
          colors={onboardingSlides[currentIndex].colors || ["#4c669f","#3b5998"]} // Apply the current slide's gradient
          style={styles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <FlatList
            data={onboardingSlides}
            renderItem={({ item, index }) => <OnboardingItem item={item} index={index} scrollX={scrollX} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.key}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            scrollEventThrottle={32}
            ref={slidesRef}
          />

          {/* Bottom Controls Container */}
          <View style={styles.bottomContainer}>
            <Pagination data={onboardingSlides} scrollX={scrollX} />
            
            {/* Animated Button */}
            <TouchableOpacity style={styles.button} onPress={scrollTo}>
              <SafeLinearGradient  
                colors={['#ffffff', '#f0f0f0'] || ["#4c669f","#3b5998"]} // Light gradient for button
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 1 }} 
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {currentIndex === onboardingSlides.length - 1 ? 'শুরু করুন' : 'পরবর্তী'}
                </Text>
              </SafeLinearGradient>
            </TouchableOpacity>
          </View>
        </SafeLinearGradient >
      </Animated.View>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#007a4a' },
  gradientBackground: { flex: 1, justifyContent: 'space-around', alignItems: 'center' },
  
  // --- Slide Styles ---
  slide: { width, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30, paddingTop: height * 0.1 },
  iconContainer: { 
    width: 160, 
    height: 160, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
    borderRadius: 80, 
    marginBottom: 50, 
    borderWidth: 3, // Soft border
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 10, 
    elevation: 15 
  },
  icon: { fontSize: 80, color: 'white' }, // Icon color changed to white for better contrast
  title: { 
    fontSize: 28, 
    fontWeight: '900', // Extra bold
    color: 'white', 
    textAlign: 'center', 
    marginBottom: 15, 
    textShadowColor: 'rgba(0,0,0,0.5)', 
    textShadowOffset: { width: 1, height: 2 }, 
    textShadowRadius: 3 
  },
  description: { 
    fontSize: 18, 
    color: 'rgba(255,255,255,0.9)', 
    textAlign: 'center', 
    lineHeight: 28, 
    maxWidth: '90%' 
  },

  // --- Bottom & Pagination Styles ---
  bottomContainer: { justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 50, width: '100%', paddingHorizontal: 30 },
  paginationContainer: { flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  dot: { height: 10, borderRadius: 5, backgroundColor: 'white', marginHorizontal: 6 },
  
  // --- Button Styles ---
  button: { 
    width: '100%', // Full width in the padding space
    height: 55, 
    borderRadius: 27, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 10 
  },
  buttonGradient: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 27 },
  buttonText: { color: '#006400', fontSize: 18, fontWeight: 'bold' }, // Dark green text on white button
});

export default OnboardingScreen;