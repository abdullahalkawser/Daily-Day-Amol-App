import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const QuranPage = () => {
  const [surahList, setSurahList] = useState([]);
  const [expandedSurah, setExpandedSurah] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ayatPage, setAyatPage] = useState(1);
  const [displayedAyat, setDisplayedAyat] = useState([]);
  const [activeAyatIndex, setActiveAyatIndex] = useState(null);
  const ayatPerPage = 10;

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://api.alquran.cloud/v1/quran/bn.bengali');
        setSurahList(res.data.data.surahs);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  const toggleSurah = (surah) => {
    if (expandedSurah && expandedSurah.number === surah.number) {
      setExpandedSurah(null);
      setDisplayedAyat([]);
      setAyatPage(1);
      setActiveAyatIndex(null);
    } else {
      setExpandedSurah(surah);
      setDisplayedAyat(surah.ayahs.slice(0, ayatPerPage));
      setAyatPage(1);
      setActiveAyatIndex(null);
    }
  };

  const loadMoreAyat = () => {
    if (!expandedSurah) return;
    const nextPage = ayatPage + 1;
    const start = (nextPage - 1) * ayatPerPage;
    const end = nextPage * ayatPerPage;
    const newAyat = expandedSurah.ayahs.slice(start, end);
    if (newAyat.length > 0) {
      setDisplayedAyat(prev => [...prev, ...newAyat]);
      setAyatPage(nextPage);
    }
  };

  const renderAyat = ({ item, index }) => {
    const isActive = index === activeAyatIndex;
    return (
      <TouchableOpacity onPress={() => setActiveAyatIndex(index)}>
        <View style={[styles.ayatContainer, isActive && styles.activeAyat]}>
          <Text style={styles.arabicText}>{item.text}</Text>
          <Text style={styles.translationText}>{item.translation}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <FlatList
      data={expandedSurah ? displayedAyat : surahList}
      keyExtractor={(item, index) => expandedSurah ? item.number.toString() : item.number.toString()}
      renderItem={({ item, index }) =>
        expandedSurah ? renderAyat({ item, index }) : (
          <TouchableOpacity onPress={() => toggleSurah(item)} style={styles.surahHeader}>
            <Text style={styles.surahName}>{item.englishName} ({item.name})</Text>
          </TouchableOpacity>
        )
      }
      onEndReached={expandedSurah ? loadMoreAyat : null}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={!expandedSurah ? <Text style={styles.pageTitle}>All Surahs</Text> : null}
    />
  );
};

const styles = StyleSheet.create({
  pageTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 10, color: '#1a237e' },
  surahHeader: { padding: 15, marginVertical: 5, backgroundColor: '#7986cb', borderRadius: 10 },
  surahName: { fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' },
  ayatContainer: { marginVertical: 8, padding: 12, backgroundColor: '#e8eaf6', borderRadius: 10 },
  activeAyat: { backgroundColor: '#ffcc80' },
  arabicText: { fontSize: 20, textAlign: 'right', fontWeight: 'bold' },
  translationText: { fontSize: 16, marginTop: 5, color: '#555' },
});

export default QuranPage;
