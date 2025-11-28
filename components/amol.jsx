import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';

const screenWidth = Dimensions.get('window').width;

const defaultAmols = [
  { name: 'ফজরের নামাজ', protiti: '1 বার', priority: 'দৈনিক', completed: false },
  { name: 'যাকাত', protiti: 'মাসে 1 বার', priority: 'মাসিক', completed: false },
  { name: 'কুরআন তেলাওয়াত', protiti: 'দৈনিক', priority: 'দৈনিক', completed: false },
  { name: 'দু’আ', protiti: 'প্রয়োজনমতো', priority: 'সাপ্তাহিক', completed: false },
  { name: 'রোযা', protiti: 'সপ্তাহে 1 বার', priority: 'সাপ্তাহিক', completed: false },
];

export default function TodayAmolPage() {
  const [amolName, setAmolName] = useState('');
  const [protiti, setProtiti] = useState('');
  const [priority, setPriority] = useState('দৈনিক');
  const [amolList, setAmolList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    loadAmols();
  }, []);

  const loadAmols = async () => {
    const storedAmols = await AsyncStorage.getItem('amolList');
    if (storedAmols) {
      setAmolList(JSON.parse(storedAmols));
    } else {
      setAmolList(defaultAmols);
      await AsyncStorage.setItem('amolList', JSON.stringify(defaultAmols));
    }
  };

  const saveAmols = async (list) => {
    setAmolList(list);
    await AsyncStorage.setItem('amolList', JSON.stringify(list));
  };

  const addOrEditAmol = async () => {
    if (!amolName || !protiti || !priority) {
      Alert.alert('Error', 'সব ফিল্ড পূরণ করুন');
      return;
    }

    if (editIndex !== null) {
      const updatedList = [...amolList];
      updatedList[editIndex] = { name: amolName, protiti, priority, completed: false };
      await saveAmols(updatedList);
      setEditIndex(null);
    } else {
      const updatedList = [...amolList, { name: amolName, protiti, priority, completed: false }];
      await saveAmols(updatedList);
    }

    setAmolName('');
    setProtiti('');
    setPriority('দৈনিক');
  };

  const deleteAmol = async (index) => {
    Alert.alert(
      'Confirm Delete',
      'আপনি কি এই আমলটি মুছে ফেলতে চান?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedList = amolList.filter((_, i) => i !== index);
            await saveAmols(updatedList);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const toggleComplete = async (index) => {
    const updatedList = [...amolList];
    const item = updatedList[index];
    if (!item.completed) {
      Alert.alert('Amol Complete', `আপনি "${item.name}" complete করেছেন!`);
    }
    item.completed = !item.completed;
    await saveAmols(updatedList);
  };

  const resetAmols = () => {
    Alert.alert(
      'Reset Amols',
      'আজকের সব আমল reset করা হবে।',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            const resetList = amolList.map((a) => ({ ...a, completed: false }));
            await saveAmols(resetList);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const progress = amolList.length ? amolList.filter(a => a.completed).length / amolList.length : 0;

  const priorityColor = (p) => {
    switch (p) {
      case 'দৈনিক': return ['#4caf50', '#81c784'];
      case 'সাপ্তাহিক': return ['#ff9800', '#ffc107'];
      case 'মাসিক': return ['#2196f3', '#64b5f6'];
      default: return ['#9e9e9e', '#bdbdbd'];
    }
  };

  const renderAmol = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => toggleComplete(index)}
    >
      <LinearGradient
        colors={priorityColor(item.priority)}
        style={styles.cardGradient}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          {item.completed && <Ionicons name="checkmark-circle" size={24} color="#fff" />}
        </View>
        <Text style={styles.cardSubtitle}>{item.protiti}</Text>
        <Text style={styles.priority}>{item.priority}</Text>
      </LinearGradient>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.editBtn} onPress={() => { setAmolName(item.name); setProtiti(item.protiti); setPriority(item.priority); setEditIndex(index); }}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteAmol(index)}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
<LinearGradient
  colors={['#345ee8ff', '#24c786ff']}
  style={[styles.header, { marginTop: 150 }]} // এখানে value adjust করতে পারো
>
  <Text style={styles.headerText}>আজকের আমল</Text>
</LinearGradient>


      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.inputTitle}>নতুন আমল যোগ করুন</Text>
        <TextInput
          placeholder="আমলের নাম"
          style={styles.input}
          value={amolName}
          onChangeText={setAmolName}
        />
        <TextInput
          placeholder="প্রতিটি"
          style={styles.input}
          value={protiti}
          onChangeText={setProtiti}
        />
        <TextInput
          placeholder="Priority (দৈনিক / সাপ্তাহিক / মাসিক)"
          style={styles.input}
          value={priority}
          onChangeText={setPriority}
        />
        <LinearGradient colors={['#15b146', '#4caf50']} style={styles.button}>
          <TouchableOpacity onPress={addOrEditAmol} style={{ width: '100%', alignItems: 'center', padding: 12 }}>
            <Text style={styles.buttonText}>{editIndex !== null ? 'Update' : 'যোগ করুন'}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Amol List */}
      <FlatList
        data={amolList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderAmol}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />

      {/* Circular Reset Button */}
      <TouchableOpacity 
        onPress={resetAmols} 
        style={styles.resetBtn}>
        <Ionicons name="refresh" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Progress Bar */}
      <View style={styles.progressContainer}>
        <Progress.Bar progress={progress} width={screenWidth * 0.9} color="#4caf50" />
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c1d1dff' },
  header: { paddingVertical: 20, alignItems: 'center', marginBottom: 10 },
  headerText: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  form: { paddingHorizontal: 16, marginBottom: 10 },
  inputTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, fontSize: 16 },
  button: { borderRadius: 12, elevation: 3, marginTop: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  listContainer: { paddingHorizontal: 8, paddingBottom: 120 },
  card: { flex: 1, margin: 8 },
  cardGradient: { borderRadius: 16, padding: 16, elevation: 5 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#fff' },
  cardSubtitle: { fontSize: 14, color: '#fff' },
  priority: { color: '#fff', fontWeight: 'bold', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginTop: 6, alignSelf: 'flex-start' },
  cardActions: { flexDirection: 'row', marginTop: 8, width: '100%', justifyContent: 'space-between' },
  editBtn: { backgroundColor: '#ffc107', padding: 6, borderRadius: 8, flex: 1, marginRight: 5, alignItems: 'center' },
  deleteBtn: { backgroundColor: '#dc3545', padding: 6, borderRadius: 8, flex: 1, marginLeft: 5, alignItems: 'center' },
  actionText: { color: '#fff', fontWeight: 'bold' },
  resetBtn: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#dc3545',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  progressContainer: { position: 'absolute', bottom: 20, alignSelf: 'center', alignItems: 'center' },
  progressText: { color: '#fff', fontWeight: 'bold', marginTop: 5 },
});
