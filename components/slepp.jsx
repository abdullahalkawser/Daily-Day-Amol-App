// SleepPracticesCards.jsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const sleepPracticesData = [
  {
    id: 'step1',
    title: 'ধাপ ১: অযু করা',
    iconName: 'water',
    data: [
      {
        id: 'step1-1',
        title: 'অযু করুন',
        description: 'ঘুমানোর আগে অযু করা সুন্নত। এটি আমাদের পবিত্র অবস্থায় ঘুমাতে সাহায্য করে।',
        hadith: 'রাসূলুল্লাহ (সা.) বলেছেন: "যখন তুমি বিছানায় যাবে, তখন নামাযের মত করে অযু করবে।"'
      }
    ]
  },
  {
    id: 'step2',
    title: 'ধাপ ২: বিছানা পরিষ্কার করা',
    iconName: 'broom',
    data: [
      {
        id: 'step2-1',
        title: 'বিছানা ঝেড়ে নিন',
        description: 'বিছানায় যাওয়ার আগে চাদর দিয়ে বিছানা তিনবার ঝেড়ে নিন।',
        arabic: 'بِسْمِ اللهِ',
        pronunciation: 'বিসমিল্লাহ',
        meaning: '(আল্লাহর নামে)'
      }
    ]
  },
  {
    id: 'step3',
    title: 'ধাপ ৩: ঘুমের দোয়া পড়া',
    iconName: 'book',
    data: [
      {
        id: 'step3-1',
        title: 'প্রধান ঘুমের দোয়া',
        description: 'এই দোয়া পড়ে ঘুমানো সুন্নত।',
        arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
        pronunciation: 'আল্লাহুম্মা বিসমিকা আমূতু ওয়া আহইয়া',
        meaning: 'হে আল্লাহ! তোমার নামেই আমি মরি এবং বাঁচি।'
      }
    ]
  },
  {
    id: 'step4',
    title: 'ধাপ ৪: আল-মুলক সূরা পড়া',
    iconName: 'book-open',
    data: [
      {
        id: 'step4-1',
        title: 'সূরা আল-মুলক',
        description: 'ঘুমানোর আগে সূরা আল-মুলক পড়া সুন্নত।',
        arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ',
        pronunciation: 'তবারকল্লাযী বীযিদিহিল-মূলকু',
        meaning: 'সার্বভৌম শক্তিশালী আল্লাহর জন্য'
      }
    ]
  },
  {
    id: 'step5',
    title: 'ধাপ ৫: আয়াতুল কুরসি পড়া',
    iconName: 'book',
    data: [
      {
        id: 'step5-1',
        title: 'আয়াতুল কুরসি',
        description: 'ঘুমানোর আগে আয়াতুল কুরসি পড়া অত্যন্ত বরকতময়।',
        arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ...',
        pronunciation: 'আল্লাহু লা ইলাহা ইল্লা হুয়াল হায়্যুল কাইয়্যুম',
        meaning: 'আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি জীবিত ও সবকিছুর রক্ষক।'
      }
    ]
  },
  {
    id: 'step6',
    title: 'ধাপ ৬: বাকারার শেষ দুই আয়াত',
    iconName: 'book',
    data: [
      {
        id: 'step6-1',
        title: 'বাকারার শেষ ২ আয়াত',
        description: 'ঘুমানোর আগে বাকারার শেষ দুই আয়াত পড়া সুন্নত।',
        arabic: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ...',
        pronunciation: 'আমানার রাসূলু বীমা উঞ্জিলা ইলাইহি মিন রব্বিহি ওয়াল-মুমিনুন ...',
        meaning: 'রাসূল এবং মুমিনরা যা তাদের রবের কাছ থেকে অবতীর্ণ হয়েছে তা বিশ্বাস করে।'
      }
    ]
  },
  {
    id: 'step7',
    title: 'ধাপ ৭: ডান কাত হয়ে শোয়া',
    iconName: 'bed',
    data: [
      {
        id: 'step7-1',
        title: 'ডান কাত হয়ে শুয়ে দোয়া',
        description: 'ডান কাত হয়ে ডান হাত গালের নিচে রেখে দোয়া পড়ুন।',
        arabic: 'اللَّهُمَّ أَسْلَمْتُ وَجْهِي إِلَيْكَ',
        pronunciation: 'আল্লাহুম্মা আসলামতু ওয়াজহিয়া ইলাইকা',
        meaning: 'হে আল্লাহ! আমি আমার মুখ তোমার কাছে সমর্পণ করলাম।'
      }
    ]
  },
  {
    id: 'step8',
    title: 'ধাপ ৮: তাসবীহ পড়া',
    iconName: 'meditation',
    data: [
      {
        id: 'step8-1',
        title: 'সুবহানাল্লাহ, আলহামদুলিল্লাহ, আল্লাহু আকবার',
        description: 'সুবহানাল্লাহ ৩৩ বার, আলহামদুলিল্লাহ ৩৩ বার, আল্লাহু আকবার ৩৪ বার পড়া।',
        arabic: 'سُبْحَانَ اللهِ ... الْحَمْدُ لِلَّهِ ... اللَّهُ أَكْبَر',
        pronunciation: 'সুবহানাল্লাহ ... আলহামদুলিল্লাহ ... আল্লাহু আকবার',
        meaning: 'আল্লাহর প্রশংসা এবং মহানত্ব স্মরণ।'
      }
    ]
  },
  {
    id: 'step9',
    title: 'ধাপ ৯: মন শান্ত করা',
    iconName: 'meditation',
    data: [
      {
        id: 'step9-1',
        title: 'ধ্যান ও রিল্যাক্সেশন',
        description: 'ঘুমানোর আগে ধ্যান করুন এবং আল্লাহর দিকে মনোযোগ দিন।',
        arabic: '',
        pronunciation: '',
        meaning: 'মন শান্ত রাখা সুন্নত।'
      }
    ]
  },
  {
    id: 'step10',
    title: 'ধাপ ১০: দোয়া শেষে আল্লাহর স্মরণ',
    iconName: 'heart',
    data: [
      {
        id: 'step10-1',
        title: 'আল্লাহর স্মরণ',
        description: 'ঘুমানোর আগে দোয়া শেষ করে আল্লাহর স্মরণ করুন।',
        arabic: '',
        pronunciation: '',
        meaning: 'আল্লাহর স্মরণ করে ঘুমানো সুন্নত।'
      }
    ]
  }
];

const SleepPracticesCards = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Header */}
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <Ionicons name="moon" size={36} color="#fff" style={{ marginTop: 10 }} />
        <Text style={styles.headerTitle}>ঘুমানোর সুন্নত আমল</Text>
        <Text style={styles.headerSubtitle}>প্রতিটি ধাপের বিস্তারিত তথ্য</Text>

        {/* Back Button নিচে */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Cards */}
      <View style={styles.cardsContainer}>
        {sleepPracticesData.map(step => (
          <View key={step.id} style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Ionicons name={step.iconName} size={24} color="#764ba2" />
              <Text style={styles.stepTitle}>{step.title}</Text>
            </View>
            {step.data.map(item => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {item.description && <Text style={styles.itemDescription}>{item.description}</Text>}
                {item.arabic && <Text style={styles.arabic}>{item.arabic}</Text>}
                {item.pronunciation && <Text style={styles.pronunciation}>{item.pronunciation}</Text>}
                {item.meaning && <Text style={styles.meaning}>অর্থ: {item.meaning}</Text>}
                {item.hadith && <Text style={styles.hadith}>হাদিস: {item.hadith}</Text>}
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  header: { paddingTop: 60, paddingBottom: 40, alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  backButton: { marginTop: 15 }, // নিচে রাখার জন্য margin-top
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop: 10 },
  headerSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  cardsContainer: { paddingHorizontal: 20, marginTop: 20 },
  stepContainer: { marginBottom: 20 },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  stepTitle: { fontSize: 20, fontWeight: 'bold', color: '#34495e', marginLeft: 8 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 3 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#34495e', marginBottom: 5 },
  itemDescription: { fontSize: 14, color: '#555', marginBottom: 5 },
  arabic: { fontSize: 22, color: '#2c3e50', textAlign: 'right', marginBottom: 5 },
  pronunciation: { fontSize: 16, fontStyle: 'italic', color: '#466C99', marginBottom: 5 },
  meaning: { fontSize: 14, fontWeight: 'bold', color: '#666', marginBottom: 5 },
  hadith: { fontSize: 14, fontStyle: 'italic', color: '#666', marginBottom: 5 },
});

export default SleepPracticesCards;
