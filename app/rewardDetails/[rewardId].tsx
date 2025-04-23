import React, { useState, useEffect,useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useKey } from '../../context/KeyContext'; 
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default function RewardDetails() {
  const { rewardId } = useLocalSearchParams();
  const [reward, setReward] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const animationRef = useRef<LottieView>(null);
  const navigation = useNavigation();
  const { keyBalance, subtractKeys } = useKey();

  const [liked, setLiked] = useState(false);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  const handleHeartPress = () => {
    setLiked(!liked);
  };

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

  const handleClaim = () => {
    subtractKeys(reward.Cost);
    setShowUnlockAnimation(true);
  
    setTimeout(() => {
      animationRef.current?.play(0, 250);
    }, 0);
  
    setTimeout(() => {
      setShowUnlockAnimation(false);
    }, 2000);
  };

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
        <Image 
          source={require('../../assets/images/back-button.png')}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.heartButton} onPress={handleHeartPress}>
        <Image 
          source={require('../../assets/images/heart.png')}
          style={[styles.heartButtonImage, { tintColor: liked ? 'red' : '#141414' }]}
        />
      </TouchableOpacity>

      <Image source={imageMap(reward.Name)} style={styles.rewardImage} />

      <Text style={styles.title}>{reward.Name}</Text>
      <Text style={styles.description}>{reward.Description}</Text>
      <Text style={styles.detailText}>Location: {reward.Location + " with " + reward.Instructor}</Text>
      <Text style={styles.detailText}>{reward.Date}</Text>
      <Text style={styles.detailText}>{reward.ClassName}</Text>

      <TouchableOpacity
        style={styles.claimButton}
        onPress={handleClaim}>
        <Text style={styles.claimButtonText}>Book for {reward.Cost} keys</Text>
      </TouchableOpacity>

      {showUnlockAnimation && (
        <View style={styles.animationOverlay}>
          <LottieView
            ref={animationRef}
            source={require('../../assets/animations/unlock-padlock.json')}
            loop={false}
            speed={2}
            style={{ width: 200, height: 200 }}
            
          />
          <Text style={styles.claimText}>GymKey claimed!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 5,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    tintColor: '#141414',
  },
  heartButton: {
    position: 'absolute',
    top: 40,
    left: 330,
    padding: 10,
    borderRadius: 5,
  },
  heartButtonImage: {
    width: 30,
    height: 30,
    tintColor: '#141414',
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
    backgroundColor: '#4004A4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  claimButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  rewardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  animationOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  claimText: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#4004A4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  
});
