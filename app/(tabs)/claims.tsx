import React, { useState, useEffect } from 'react';
import { useKey } from '../../context/KeyContext'; 
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { RewardType } from '../navigation/navigationTypes';

export default function Claims() {
  const [rewards, setRewards] = useState<RewardType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { keyBalance} = useKey();

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

  const imageMap = (itemName: string) => {
    try {
      switch (itemName) {
        case 'SolidCore':
          return require('../../assets/images/SolidCore.jpg');
        case 'SoulCycle':
          return require('../../assets/images/SoulCycle.png');
        case 'Diva Dance':
          return require('../../assets/images/DivaDance.png');
        case 'PeachBurn':
          return require('../../assets/images/PeachBurn.png');
        case 'Pure Barre':
          return require('../../assets/images/PureBarre.png');
        default:
          return require('../../assets/images/SolidCore.jpg');
      }
    } catch (error) {
      return require('../../assets/images/SolidCore.jpg');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5E35B1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unlock Your GymKeys</Text>
      <View style={styles.balance}>
        <View style={styles.whiteBox}>
          <Image 
            source={require('../../assets/images/key.png')}
            style={styles.keyImage}
          />
          <Text style={styles.balanceText}>{keyBalance}</Text>
        </View>
        
      </View>
      {/* test code*/}
      {/* <TouchableOpacity onPress={() => addKeys(50)}>
            <Text>Add 5 Keys</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => subtractKeys(2)}>
            <Text>Use 2 Keys</Text>
      </TouchableOpacity> */}

      <Text style={styles.categories}>Austin Favorites</Text>
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.rewardBox}
            onPress={() =>
              router.push({
                pathname: "../rewardDetails/[rewardId]",
                params: { rewardId: item.id },
              })
            }
          >
            <Image source={imageMap(item.Name)} style={styles.rewardImage} />
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardName}>{item.Name}</Text>
              <Text style={styles.rewardLocation}>{item.ClassName}</Text>
              <Text style={styles.rewardCost}>{item.Cost} keys</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const boxWidth = (windowWidth - 60) / 2;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  categories: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  title: {
    backgroundColor: '#D5C7FF',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    textAlign: 'center',
    fontSize: 24,
    padding: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5E35B1',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rewardBox: {
    width: boxWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rewardImage: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  rewardInfo: {
    padding: 10,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  rewardLocation: {
    fontSize: 10.5,
    color: '#5E35B1',
  },
  rewardCost: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5E35B1',
  },
  balance: {
    paddingLeft: 10,
    flexDirection: 'row',
    backgroundColor: '#D5C7FF',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 5,
    height: 40,
    fontWeight: 'bold',
    marginBottom: 5,
    width: '25%',
  },
  whiteBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  keyImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    tintColor: '#5E35B1',
  },
  balanceText: {
    fontSize: 18,
    backgroundColor: '#fff',
    textAlign: 'center',
    lineHeight: 18,
    color: '#5E35B1',
  },
});