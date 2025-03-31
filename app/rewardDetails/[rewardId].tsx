import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function RewardDetails() {
  const { rewardId } = useLocalSearchParams();
  const [reward, setReward] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const rewardRef = doc(db, 'rewards', rewardId as string);
        const rewardDoc = await getDoc(rewardRef);
        
        if (rewardDoc.exists()) {
          setReward(rewardDoc.data()); 
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching reward details: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (rewardId) {
      fetchReward(); 
    }
  }, [rewardId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!reward) {
    return (
      <View style={styles.container}>
        <Text>No reward data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{reward.Name}</Text>
      <Text style={styles.description}>{reward.Description}</Text>
      <Text style={styles.detailText}>Date: {reward.Date}</Text>
      <Text style={styles.detailText}>Location: {reward.Location}</Text>
      <Text style={styles.detailText}>Class Name: {reward.ClassName}</Text>
      <TouchableOpacity style={styles.claimButton}>
        <Text style={styles.claimButtonText}>Claim for {reward.Cost} keys</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,  // TODO: CHANGE THIS PADDING ONCE IMAGE ELEMENT IS ADDED
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  claimButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#D3D3D3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  claimButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
