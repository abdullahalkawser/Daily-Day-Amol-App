import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    BackHandler,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import SafeLinearGradient from '../components/SafeLinearGradient';

// Morning Steps
const morningSteps = [
  { step: "ফজরের নামাজ", description: "২ রাকাত ফরজ + ২ রাকাত সুন্নত।" },
  { step: "তাসবিহ", description: "Subhanallah – 33 বার, Alhamdulillah – 33 বার, Allahu Akbar – 34 বার।" },
  { step: "কোরআন পাঠ", description: "20 আয়াত পড়া।" },
  { step: "ইস্তেগফার", description: "1000 বার Astaghfirullah।" },
  { step: "দরূদ", description: "দরূদ শরিফ পড়া।" },
  { step: "নফল নামাজ", description: "২-৪ রাকাত।" },
  { step: "সুন্নাহ আমল", description: "দয়া, সাহায্য, স্মরণীয় নফল আমল।" },
  { step: "সকাল দোয়া", description: "সকালীন দোয়া পাঠ।" },
  { step: "স্মরণীয় যিকির", description: "কিছু আল্লাহর নাম স্মরণ।" },
  { step: "হালকা ব্যায়াম", description: "নিয়মিত হাঁটা বা ব্যায়াম।" },
];

// Evening Steps
const eveningSteps = [
  { step: "মাগরিবের নামাজ", description: "৩ রাকাত ফরজ + ২ রাকাত সুন্নত।" },
  { step: "তাসবিহ", description: "Subhanallah – 10 বার, Alhamdulillah – 10 বার, Allahu Akbar – 10 বার।" },
  { step: "কোরআন পাঠ", description: "20 আয়াত পড়া।" },
  { step: "ইস্তেগফার", description: "1000 বার Astaghfirullah।" },
  { step: "দরূদ", description: "দরূদ শরিফ পড়া।" },
  { step: "নফল নামাজ", description: "২-৪ রাকাত।" },
  { step: "পরিবারের জন্য দোয়া", description: "পরিবার ও প্রিয়জনের জন্য দোয়া।" },
  { step: "রাত্রি দোয়া", description: "রাত্রি দোয়া পাঠ।" },
  { step: "স্মরণীয় যিকির", description: "আল্লাহর নাম স্মরণ।" },
  { step: "আত্মসমালোচনা", description: "দিনের কাজের পর্যালোচনা।" },
];

// Routines Array
const routines = [
  { id: "1", title: "সকালের আমল (Fajr / Morning)", steps: morningSteps },
  { id: "2", title: "সন্ধ্যার আমল (Maghrib / Evening)", steps: eveningSteps },
];

// RoutineCard Component
const RoutineCard = ({ step }) => {
  const [expanded, setExpanded] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      onLongPress={() => setDone(!done)}
      activeOpacity={0.8}
    >
      <SafeLinearGradient
        colors={done ? ["#b2fab4", "#7ae27a"] : ["#e0c3fc", "#8ec5fc"]}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <Ionicons
            name={done ? "checkmark-circle" : "ellipse-outline"}
            size={22}
            color={done ? "#006400" : "#4b0082"}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.step}>{step.step}</Text>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#333"
            style={{ marginLeft: "auto" }}
          />
        </View>
        {expanded && <Text style={styles.description}>{step.description}</Text>}
      </SafeLinearGradient>
    </TouchableOpacity>
  );
};

// GhuslRoutinePage Component
const GhuslRoutinePage = ({ onClose }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      {/* Header */}
      <SafeLinearGradient
        colors={["#667eea", "#764ba2"]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Pressable
          style={{ position: "absolute", left: 16, top: 45 }}
          onPress={() => {
            if (onClose) {
              onClose(); // parent controlled
            } else if (Platform.OS === "android") {
              BackHandler.exitApp(); // app exit for Android
            } else {
              console.log("Back pressed");
            }
          }}
        >
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </Pressable>
        <Ionicons name="sunny" size={36} color="#fff" style={{ marginBottom: 10 }} />
        <Text style={styles.headerTitle}>সকাল ও সন্ধ্যার আমল</Text>
        <Text style={styles.headerSubtitle}>নামাজ, দোয়া ও অতিরিক্ত আমল</Text>
      </SafeLinearGradient>

      {/* Routines */}
      <ScrollView style={{ flex: 1 }}>
        {routines.map((routine) => (
          <View key={routine.id} style={styles.routineContainer}>
            <Text style={styles.routineTitle}>{routine.title}</Text>
            {routine.steps.map((step, idx) => (
              <RoutineCard key={idx} step={step} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  headerGradient: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: { fontSize: 26, fontWeight: "bold", color: "#fff" },
  headerSubtitle: { fontSize: 16, color: "#e0e0e0", marginTop: 4 },

  routineContainer: { marginTop: 16 },
  routineTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 16,
    marginBottom: 10,
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  step: { fontSize: 18, fontWeight: "600", color: "#4b0082" },
  description: { fontSize: 15, color: "#333", lineHeight: 22 },
});

export default GhuslRoutinePage;
