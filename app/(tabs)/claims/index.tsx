import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { RewardType } from '../../navigation/navigationTypes'; 

export default function Claims() {
  const [rewards, setRewards] = useState<RewardType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const rewardsCollection = collection(db, 'rewards');
        const rewardsSnapshot = await getDocs(rewardsCollection);
        const rewardsList = rewardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as RewardType[];
        setRewards(rewardsList);
      } catch (error) {
        console.error('Error fetching rewards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unlock Your GymKeys</Text>
      <Text style={styles.categories}>Austin Favorites</Text>
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.rewardBox} 
            onPress={() => router.push({ pathname: "/claims/[rewardId]", params: { rewardId: item.id } })}>
            <Text style={styles.rewardName}>{item.Name}</Text>
            <Text style={styles.rewardLocation}>{'\n'}IMAGE LOCATION{'\n\n'}</Text>
            <Text style={styles.rewardLocation}>{item.Location}</Text>
            <Text style={styles.rewardCost}>{item.Cost} keys</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#eeeeee',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  categories: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    backgroundColor: '#D9D9D9',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    textAlign: 'center',
    fontSize: 24,
    padding: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rewardBox: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  rewardName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rewardLocation: {
    fontSize: 14,
    color: '#666',
  },
  rewardCost: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
