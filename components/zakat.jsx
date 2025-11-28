import { Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useRouter } from "expo-router";
import { StatusBar } from 'react-native';
import SafeLinearGradient from '../components/SafeLinearGradient';
const { width } = Dimensions.get('window');

const ZakatApp = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('calculator');
  const [wealth, setWealth] = useState({ cash: '', gold: '', silver: '', business: '', investments: '', debts: '' });
  const [results, setResults] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goldPrice] = useState(7500); // Taka per Bhori
  const [silverPrice] = useState(135); // Taka per Tola

  const zakatInfo = [
    { id: 1, title: 'যাকাত কি?', description: 'যাকাত ইসলামের পঞ্চস্তম্ভের একটি। এটি নির্দিষ্ট পরিমাণ সম্পদের মালিকদের উপর বাধ্যতামূলক একটি ইবাদত।', icon: <MaterialIcons name="info-outline" size={32} color="white" />, color: ['#3b82f6', '#9333ea'] },
    { id: 2, title: 'যাকাতের হার', description: 'সাধারণত যাকাত ২.৫% হারে দিতে হয়। তবে বিভিন্ন সম্পদের জন্য বিভিন্ন হার নির্ধারিত রয়েছে।', icon: <Entypo name="trending-up" size={32} color="white" />, color: ['#10b981', '#14b8a6'] },
    { id: 3, title: 'নিসাব', description: 'নিসাব হলো সর্বনিম্ন সম্পদের পরিমাণ যার উপর যাকাত ফরজ হয়। বর্তমানে এটি প্রায় ৮৭.৪৮ গ্রাম সোনার সমান।', icon: <FontAwesome5 name="coins" size={32} color="white" />, color: ['#facc15', '#f97316'] },
    { id: 4, title: 'যাকাতের উপকারিতা', description: 'যাকাত সমাজে ধন-সম্পদের সুষম বণ্টন নিশ্চিত করে এবং দরিদ্রদের সাহায্য করে।', icon: <Ionicons name="heart-outline" size={32} color="white" />, color: ['#ec4899', '#ef4444'] },
  ];

  const guideInfo = [
    { id: 1, title: 'যাকাতের নিসাব গণনা', details: 'যাকাত ফরজ হওয়ার জন্য নিসাব পরিমাণ সম্পদ এক বছর স্থায়ীভাবে মালিকানাধীন থাকতে হবে। নিসাব হলো ৮৭.৪৮ গ্রাম সোনা অথবা ৬১২.৩৬ গ্রাম রূপার বর্তমান বাজারমূল্য।', icon: 'scale', color: ['#facc15', '#f97316'] },
    { id: 2, title: 'সম্পদের প্রকার', details: 'নগদ অর্থ, স্বর্ণ, রূপা, বাণিজ্যিক পণ্য, বিনিয়োগ, এবং কৃষি পণ্যের উপর যাকাত প্রযোজ্য। ঋণ এবং ব্যক্তিগত ব্যবহারের সম্পদ (যেমন বাড়ি, গাড়ি) এর অন্তর্ভুক্ত নয়।', icon: 'briefcase', color: ['#10b981', '#14b8a6'] },
    { id: 3, title: 'যাকাত কাদের দিতে হয়', details: 'যাদের সম্পদ নিসাবের সমান বা তার বেশি এবং এক বছর পূর্ণ হয়েছে, তাদের উপর যাকাত দেওয়া ফরজ।', icon: 'user', color: ['#3b82f6', '#9333ea'] },
    { id: 4, title: 'যাকাত কাদের দেওয়া যায়', details: 'যাকাত সমাজের দরিদ্র, মিসকিন, ঋণগ্রস্ত, এবং নতুন মুসলিমদের মধ্যে বিতরণ করা যেতে পারে।', icon: 'hand-holding-usd', color: ['#ec4899', '#ef4444'] },
  ];

  const calculateZakat = () => {
    const bhoriToGram = 11.664;
    const tolaToGram = 11.6638;
    const nisabAmount = (87.48 / bhoriToGram) * goldPrice; // Nisab based on Gold
    const totalWealth =
      (parseFloat(wealth.cash) || 0) +
      (parseFloat(wealth.gold) || 0) +
      (parseFloat(wealth.silver) || 0) +
      (parseFloat(wealth.business) || 0) +
      (parseFloat(wealth.investments) || 0) -
      (parseFloat(wealth.debts) || 0);

    const zakatDue = totalWealth >= nisabAmount ? (totalWealth * 2.5) / 100 : 0;
    setResults({ totalWealth, nisabAmount, zakatDue, isEligible: totalWealth >= nisabAmount });
    setIsModalVisible(true);
  };

  const resetCalculator = () => {
    setWealth({ cash: '', gold: '', silver: '', business: '', investments: '', debts: '' });
    setResults(null);
    setIsModalVisible(false);
  };

  const inputFields = [
    { key: 'cash', label: 'নগদ অর্থ (টাকা)', icon: '💰' },
    { key: 'gold', label: 'স্বর্ণের মূল্য (ভরি)', icon: '🥇' },
    { key: 'silver', label: 'রৌপ্যের মূল্য (তোলা)', icon: '🥈' },
    { key: 'business', label: 'ব্যবসায়িক সম্পদ (টাকা)', icon: '🏪' },
    { key: 'investments', label: 'বিনিয়োগ (টাকা)', icon: '📈' },
    { key: 'debts', label: 'ঋণ (টাকা)', icon: '📉' }
  ];

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      {/* Header */}
      <SafeLinearGradient colors={['#4f46e5', '#6366f1'] || ["#4c669f","#3b5998"]} style={styles.header}>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => router.back('/home')}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
    
        </View>
        <View style={styles.headerContent}>
          <View style={styles.iconCircle}>
            <FontAwesome5 name="coins" size={28} color="white" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>যাকাত ক্যালকুলেটর</Text>
            <Text style={styles.headerSubtitle}>সহজভাবে আপনার যাকাত গণনা করুন</Text>
          </View>
        </View>
        <View style={styles.priceInfoContainer}>
          <View style={styles.priceCard}>
            <Text style={styles.priceLabel}>সোনার দাম</Text>
            <Text style={styles.priceValue}>৳{goldPrice}/ভরি</Text>
          </View>
          <View style={styles.priceCard}>
            <Text style={styles.priceLabel}>রূপার দাম</Text>
            <Text style={styles.priceValue}>৳{silverPrice}/তোলা</Text>
          </View>
        </View>
      </SafeLinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {[
          { id: 'calculator', label: 'ক্যালকুলেটর', icon: () => <MaterialIcons name="calculate" size={24} color={activeTab === 'calculator' ? '#4f46e5' : 'gray'} /> },
          { id: 'info', label: 'তথ্য', icon: () => <MaterialIcons name="info-outline" size={24} color={activeTab === 'info' ? '#4f46e5' : 'gray'} /> },
          { id: 'guide', label: 'গাইড', icon: () => <Ionicons name="star-outline" size={24} color={activeTab === 'guide' ? '#4f46e5' : 'gray'} /> },
        ].map(tab => (
          <TouchableOpacity key={tab.id} onPress={() => setActiveTab(tab.id)} style={[styles.tabButton, activeTab === tab.id && styles.tabButtonActive]}>
            {tab.icon()}
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <View style={styles.tabContent}>
          {inputFields.map(field => (
            <View key={field.key} style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{field.icon} {field.label}</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="পরিমাণ লিখুন"
                value={wealth[field.key]}
                onChangeText={val => setWealth({ ...wealth, [field.key]: val })}
                style={styles.textInput}
              />
            </View>
          ))}
          <TouchableOpacity onPress={calculateZakat} style={styles.calculateButton}>
            <Text style={styles.buttonText}>যাকাত গণনা করুন 🧮</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetCalculator} style={styles.resetButton}>
            <Text style={styles.buttonText}>রিসেট</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Info Tab */}
      {activeTab === 'info' && (
        <View style={styles.tabContent}>
          {zakatInfo.map((item, index) => (
            <LinearGradient key={index} colors={item.color || ["#4c669f","#3b5998"]} style={styles.infoCard}>
              <View style={styles.infoIconContainer}>{item.icon}</View>
              <Text style={styles.infoTitle}>{item.title}</Text>
              <Text style={styles.infoDescription}>{item.description}</Text>
            </LinearGradient>
          ))}
        </View>
      )}

      {/* Guide Tab */}
      {activeTab === 'guide' && (
        <View style={styles.tabContent}>
          <Text style={styles.guideHeader}>যাকাত প্রদানের নিয়ম ও নির্দেশিকা</Text>
          {guideInfo.map(item => (
            <LinearGradient key={item.id} colors={item.color || ["#4c669f","#3b5998"]} style={styles.guideCard}>
              <View style={styles.guideIconContainer}>
                <FontAwesome name={item.icon} size={20} color="white" />
              </View>
              <View style={styles.guideTextContainer}>
                <Text style={styles.guideTitle}>{item.title}</Text>
                <Text style={styles.guideDetails}>{item.details}</Text>
              </View>
            </LinearGradient>
          ))}
        </View>
      )}

      {/* Results Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#888" />
            </TouchableOpacity>
            {results && (
              <>
                <Text style={styles.modalHeader}>আপনার যাকাতের ফলাফল</Text>
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>মোট সম্পদ:</Text>
                  <Text style={styles.resultValue}>৳{results.totalWealth.toLocaleString()}</Text>
                </View>
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>নিসাব পরিমাণ:</Text>
                  <Text style={styles.resultValue}>৳{results.nisabAmount.toLocaleString()}</Text>
                </View>
                <View style={[styles.resultItem, { borderBottomWidth: 0 }]}>
                  <Text style={styles.resultLabel}>যাকাতের পরিমাণ:</Text>
                  <Text style={[styles.resultValue, results.isEligible ? styles.zakatEligible : styles.zakatNotEligible]}>
                    ৳{results.zakatDue.toLocaleString()}
                  </Text>
                </View>
                <Text style={[styles.eligibilityText, results.isEligible ? styles.eligibilityEligible : styles.eligibilityNotEligible]}>
                  {results.isEligible ? '✅ আপনার উপর যাকাত ফরজ হয়েছে।' : '❌ আপনার উপর যাকাত ফরজ হয়নি।'}
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    marginLeft: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#e0e7ff',
    fontSize: 14,
    marginTop: 4,
  },
  priceInfoContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  priceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  priceLabel: {
    fontSize: 12,
    color: '#e0e7ff',
  },
  priceValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  tabButton: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    flex: 1,
    marginHorizontal: 5,
  },
  tabButtonActive: {
    backgroundColor: '#dbeafe',
  },
  tabLabel: {
    color: 'gray',
    marginTop: 4,
    fontWeight: 'bold',
  },
  tabLabelActive: {
    color: '#4f46e5',
  },
  tabContent: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 15,
    backgroundColor: 'white',
    fontSize: 16,
  },
  calculateButton: {
    backgroundColor: '#4f46e5',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  resetButton: {
    backgroundColor: '#ef4444',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 3,
  },
  infoIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  infoTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  infoDescription: {
    color: 'white',
    fontSize: 14,
    lineHeight: 22,
  },
  guideHeader: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  guideIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  guideTextContainer: {
    flex: 1,
  },
  guideTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    marginBottom: 6,
  },
  guideDetails: {
    fontSize: 14,
    marginTop: 5,
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    alignItems: 'center',
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultLabel: {
    fontSize: 16,
    color: '#555',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  zakatEligible: {
    color: 'green',
    fontSize: 20,
  },
  zakatNotEligible: {
    color: 'red',
    fontSize: 20,
  },
  eligibilityText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  eligibilityEligible: {
    color: 'green',
  },
  eligibilityNotEligible: {
    color: 'red',
  },
});

export default ZakatApp;

// const sleepPracticesData = [
//   {
//     id: 'step1',
//     title: 'ধাপ ১: অযু করা',
//     iconName: 'hand-water',
//     data: [
//       {
//         id: 'step1-1',
//         title: 'অযু করুন',
//         description: 'ঘুমানোর আগে অযু করা সুন্নত। এটি আমাদের পবিত্র অবস্থায় ঘুমাতে সাহায্য করে।',
//         hadith: 'রাসূলুল্লাহ (সা.) বলেছেন: "যখন তুমি বিছানায় যাবে, তখন নামাযের মত করে অযু করবে।"'
//       }
//     ]
//   },
//   {
//     id: 'step2',
//     title: 'ধাপ ২: বিছানা পরিষ্কার করা',
//     iconName: 'broom',
//     data: [
//       {
//         id: 'step2-1',
//         title: 'বিছানা ঝেড়ে নিন',
//         description: 'বিছানায় যাওয়ার আগে চাদর দিয়ে বিছানা তিনবার ঝেড়ে নিন।',
//         arabic: 'بِسْمِ اللهِ',
//         pronunciation: 'বিসমিল্লাহ',
//         meaning: '(আল্লাহর নামে)'
//       }
//     ]
//   },
//   {
//     id: 'step3',
//     title: 'ধাপ ৩: ঘুমের দোয়া পড়া',
//     iconName: 'book-open-variant',
//     data: [
//       {
//         id: 'step3-1',
//         title: 'প্রধান ঘুমের দোয়া',
//         description: 'এই দোয়া পড়ে ঘুমানো সুন্নত।',
//         arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
//         pronunciation: 'আল্লাহুম্মা বিসমিকা আমূতু ওয়া আহইয়া',
//         meaning: 'হে আল্লাহ! তোমার নামেই আমি মরি এবং বাঁচি।'
//       }
//     ]
//   },
//   {
//     id: 'step4',
//     title: 'ধাপ ৪: তাসবীহ পড়া',
//     iconName: 'islam',
//     data: [
//       {
//         id: 'step4-1',
//         title: 'সুবহানাল্লাহ - ৩৩ বার',
//         description: 'সুবহানাল্লাহ ৩৩ বার পড়ুন।',
//         arabic: 'سُبْحَانَ اللهِ',
//         pronunciation: 'সুবহানাল্লাহ',
//         meaning: 'আল্লাহ পবিত্র'
//       }
//     ]
//   },
//   {
//     id: 'step5',
//     title: 'ধাপ ৫: শোয়ার আদব',
//     iconName: 'bed',
//     data: [
//       {
//         id: 'step5-1',
//         title: 'ডান কাত হয়ে শুয়ে দোয়া',
//         description: 'ডান কাত হয়ে ডান হাত গালের নিচে রেখে এই দোয়া পড়ুন।',
//         arabic: 'اللَّهُمَّ أَسْلَمْتُ وَجْهِي إِلَيْكَ وَفَوَّضْتُ أَمْرِي إِلَيْكَ',
//         pronunciation: 'আল্লাহুম্মা আসলামতু ওয়াজহিয়া ইলাইকা ওয়া ফাওওয়াদতু আমরি ইলাইক',
//         meaning: 'হে আল্লাহ! আমি আমার মুখমণ্ডল তোমার কাছে সমর্পণ করলাম এবং আমার সকল বিষয় তোমার কাছে অর্পণ করলাম।'
//       }
//     ]
//   }
// ];
