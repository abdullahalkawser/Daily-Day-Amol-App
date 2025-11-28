// app/aboutapp/index.jsx
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// App Data
const APP_DETAILS = {
  description:
    `Daily Amol একটি ইসলামিক অ্যাপ যা দৈনন্দিন আমল, নামাজের সময়সূচী, দোয়া ও কুরআন পড়ার সুবিধা দেয়।`,
  features: [
    { title: 'নামাজের সময়', description: 'ফজর, জোহর, আসর, মাগরিব, ঈশা, তাহাজ্জুদ, সাহরি ও ইফতারের সময়সূচী।' },
    { title: 'কুরআন', description: 'বাংলা অনুবাদ ও উচ্চারণসহ কুরআন। অডিও এবং অফলাইন সুবিধা।' },
    { title: 'দোয়া ও জিকির', description: 'হিসনুল মুসলিম ভিত্তিক দোয়া ও জিকির।' },
    { title: 'সুন্নাহ', description: 'নবী (সা.)-এর সুন্নাহ শেখার সুবিধা।' },
  ],
  otherFeatures: [
    { title: 'ডিজিটাল তাসবিহ কাউন্টার', icon: '📿' },
    { title: 'হজ ও উমরাহ গাইড', icon: '🕋' },
    { title: 'জাকাত ক্যালকুলেটর', icon: '💰' },
    { title: 'নামাজ শিক্ষা', icon: '🕌' },
    { title: '৯৯টি আল্লাহর নাম', icon: '✨' },
    { title: 'বাংলা সাপোর্ট', icon: '🇧🇩' },
  ],
  version: '1.0.0',
  quranicVerse: [
    `“সুতরাং তোমরা আমাকে স্মরণ করো, আমি তোমাদেরকে স্মরণ করব।” (সূরা বাকারা: ১৫২)`,
    `“যারা আল্লাহকে ভয় করে, আল্লাহ তাদের জন্য পথ খুলে দেন।” (সূরা তালাক: ২-৩)`,
    `“নিশ্চয় কষ্টের পর স্বস্তি আছে।” (সূরা ইনশিরাহ: ৫-৬)`,
  ],
};

// Developer Info
const DEVELOPER_DETAILS = {
  logo: 'https://scontent.fjsr6-1.fna.fbcdn.net/v/t39.30808-6/489085217_1225632368983132_9073890756416247574_n.jpg',
  name: 'Abdullah AL Kawser',
  subtitle: '🚀 Software Engineer | 🤖 AI | Machine Learning',
  contactEmail: 'contact@bytelabs.com',
  website: 'https://bytelabs1.netlify.app/',
};

export default function AboutApp() {
  const float = useSharedValue(0);
  const [verseIndex, setVerseIndex] = useState(0);

  useEffect(() => {
    float.value = withRepeat(
      withTiming(8, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVerseIndex(prev => (prev + 1) % APP_DETAILS.quranicVerse.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }],
  }));

  return (
    <LinearGradient
      colors={['#e0f2f1', '#ffffff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Developer Info */}
        <LinearGradient
          colors={['#76c043', '#339438']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.developerHeader}>
            <Image source={{ uri: DEVELOPER_DETAILS.logo }} style={styles.logo} />
            <View style={styles.devText}>
              <Text style={styles.devName}>{DEVELOPER_DETAILS.name}</Text>
              <Text style={styles.devSubtitle}>{DEVELOPER_DETAILS.subtitle}</Text>
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL(`mailto:${DEVELOPER_DETAILS.contactEmail}`)}
            >
              <Text style={styles.buttonText}>📧 Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL(DEVELOPER_DETAILS.website)}
            >
              <Text style={styles.buttonText}>🌐 Website</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* App Info */}
        <Animated.View style={[animatedStyle, { width: '100%' }]}>
          <LinearGradient
            colors={['#14a37f', '#2ecba0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.card, { marginBottom: 20 }]}
          >
            <Text style={styles.cardHeader}>About This App</Text>
            <Text style={styles.description}>{APP_DETAILS.description}</Text>

            <Text style={styles.sectionHeader}>Features:</Text>
            {APP_DETAILS.features.map((f, i) => (
              <View key={i} style={styles.featureItem}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.description}</Text>
              </View>
            ))}

            <Text style={styles.sectionHeader}>Other Features:</Text>
            {APP_DETAILS.otherFeatures.map((f, i) => (
              <Text key={i} style={styles.otherFeature}>{`${f.icon} ${f.title}`}</Text>
            ))}
          </LinearGradient>
        </Animated.View>

        {/* Quranic Verse */}
        <LinearGradient
          colors={['#d1f2eb', '#a1e6d8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.verseCard}
        >
          <Text style={styles.verseHeader}>একটি দিকনির্দেশনামূলক আয়াত</Text>
          <Text style={styles.verseText}>{APP_DETAILS.quranicVerse[verseIndex]}</Text>
        </LinearGradient>

        {/* Version */}
        <Text style={styles.versionText}>Version {APP_DETAILS.version}</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    padding: width * 0.05,
    alignItems: 'center',
    paddingBottom: 50,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    padding: width * 0.05,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  developerHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  logo: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    borderWidth: 2,
    borderColor: '#19d900ff',
  },
  devText: { marginLeft: 15, flex: 1 },
  devName: { fontSize: width * 0.05, fontWeight: 'bold', color: '#fff' },
  devSubtitle: { fontSize: width * 0.035, color: '#e0f7f4', marginTop: 3 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 },
  button: { flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: width * 0.035, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: width * 0.035 },
  cardHeader: { fontSize: width * 0.055, fontWeight: 'bold', color: '#fff', marginBottom: 10, textAlign: 'center' },
  description: { fontSize: width * 0.035, color: '#e0f7f4', lineHeight: width * 0.05, textAlign: 'justify', marginBottom: 15 },
  sectionHeader: { fontSize: width * 0.045, fontWeight: 'bold', color: '#d1f2eb', marginTop: 10, marginBottom: 8 },
  featureItem: { marginBottom: 12 },
  featureTitle: { fontSize: width * 0.04, fontWeight: 'bold', color: '#fff' },
  featureDesc: { fontSize: width * 0.035, color: '#e0f7f4', marginTop: 2 },
  otherFeature: { fontSize: width * 0.037, color: '#e0f7f4', marginBottom: 6 },
  verseCard: {
    width: '100%',
    borderRadius: 16,
    padding: width * 0.05,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#14a37f',
  },
  verseHeader: { fontSize: width * 0.045, fontWeight: 'bold', color: '#0d4c4c', marginBottom: 8, textAlign: 'center' },
  verseText: { fontSize: width * 0.037, fontStyle: 'italic', textAlign: 'center', color: '#0d4c4c', lineHeight: width * 0.055 },
  versionText: { fontSize: width * 0.04, fontWeight: '600', color: '#2c3e3e', marginTop: 10, textAlign: 'center' },
});
