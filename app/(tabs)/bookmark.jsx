import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
import surahData from '../../assets/data.json';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);

  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    const fav = await AsyncStorage.getItem("favourites");
    if (fav) setFavourites(JSON.parse(fav));
  };

  const toggleFavourite = async (id) => {
    let updated = [...favourites];
    if (updated.includes(id)) {
      updated = updated.filter((x) => x !== id);
    } else {
      updated.push(id);
    }
    setFavourites(updated);
    await AsyncStorage.setItem("favourites", JSON.stringify(updated));
  };

  const favouriteSurah = surahData.filter(surah => favourites.includes(surah.id));

  // যদি কোনো সূরা সিলেক্ট করা থাকে, তখন ডিটেইল দেখানো
  if (selectedSurah) {
    const ayahs = selectedSurah.verses;

    return (
      <SafeAreaView style={styles.container}>
        <Pressable onPress={() => setSelectedSurah(null)} style={styles.backButton}>
          <Ionicons name="arrow-back-circle" size={42} color="#25dd25" />
        </Pressable>

        <LinearGradient
          colors={['#145214', '#4CAF50']}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.detailHeader}
        >
          <Text style={styles.surahTitle}>
            {selectedSurah.name} ({selectedSurah.transliteration})
          </Text>

          <Text style={styles.surahInfoText}>
            আয়াত: {selectedSurah.total_verses} | ধরন: {selectedSurah.type}
          </Text>

          <Pressable onPress={() => toggleFavourite(selectedSurah.id)} style={styles.favBtn}>
            <Ionicons
              name={favourites.includes(selectedSurah.id) ? "heart" : "heart-outline"}
              size={30}
              color="#fff"
            />
          </Pressable>
        </LinearGradient>

        <FlatList
          data={ayahs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <LinearGradient
              colors={['#1a431a', '#000']}
              start={[0, 0]}
              end={[1, 1]}
              style={styles.ayahCard}
            >
              <Text style={styles.arabicText}>{item.text}</Text>
              <Text style={styles.banglaText}>{item.translation}</Text>
              <Text style={styles.numberText}>আয়াত: {item.id}</Text>
            </LinearGradient>
          )}
        />
      </SafeAreaView>
    );
  }

  // ---------------- Favourite List ----------------
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>❤️ ফেভারিট সূরা</Text>

      {favouriteSurah.length === 0 ? (
        <Text style={styles.emptyText}>কোনো সূরা ফেভারিট করা হয়নি</Text>
      ) : (
        <FlatList
          data={favouriteSurah}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            const scale = new Animated.Value(1);
            return (
              <Pressable
                onPress={() => setSelectedSurah(item)} // এখানেই সিলেক্ট করা হচ্ছে
                onPressIn={() =>
                  Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start()
                }
                onPressOut={() =>
                  Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()
                }
                style={{ margin: 8 }}
              >
                <Animated.View style={{ transform: [{ scale }] }}>
                  <LinearGradient
                    colors={['#46aa46ff', '#212772ff']}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={[styles.surahCard, { width: cardWidth }]}
                  >
                    <Ionicons name="book" size={36} color="#fff" />
                    <Text numberOfLines={1} style={styles.surahName}>
                      {item.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.surahTrans}>
                      {item.transliteration}
                    </Text>
                    <Text numberOfLines={1} style={styles.surahInfo}>
                      {item.type} | আয়াত: {item.total_verses}
                    </Text>
                    <Pressable onPress={() => toggleFavourite(item.id)}>
                      <Ionicons
                        name={favourites.includes(item.id) ? "heart" : "heart-outline"}
                        size={28}
                        color="#ffcccc"
                        style={{ marginTop: 6 }}
                      />
                    </Pressable>
                  </LinearGradient>
                </Animated.View>
              </Pressable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', padding: 10 },

  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginVertical: 16,
  },

  emptyText: { fontSize: 18, color: '#fff', textAlign: 'center', marginTop: 50 },

  surahCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#00FF00',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    height: 180,
    justifyContent: "center",
  },

  detailHeader: { padding: 20, borderRadius: 12, marginBottom: 12 },

  surahTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  surahInfoText: { fontSize: 16, color: '#fff', textAlign: 'center' },

  ayahCard: {
    marginBottom: 16,
    padding: 18,
    borderRadius: 14,
  },

  arabicText: { fontSize: 30, fontWeight: 'bold', color: '#fff', textAlign: 'right' },
  banglaText: { fontSize: 20, color: '#fff', marginBottom: 6 },
  numberText: { fontSize: 14, color: '#77ff77' },

  backButton: { marginTop: 50, marginBottom: 12 },
  surahName: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginTop: 6 },
  surahTrans: { fontSize: 14, color: '#eee' },
  surahInfo: { fontSize: 13, color: '#ccc' },
});
