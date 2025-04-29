import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { useKey } from '../../context/KeyContext'; 

export default function HomeScreen() {
  const router = useRouter();
  const { keyBalance } = useKey();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top header with settings */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{keyBalance}</Text>
        </View>
      </View>

      {/* Welcome message */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.nameText}>Jane Doe!</Text>
      </View>

      {/* Main content area */}
      <View style={styles.contentContainer}>
        {/* Workout Section */}
        <View style={styles.workoutContainer}>
          <Image
            source={require('../../assets/images/SolidCore.jpg')}
            style={styles.workoutBackground}
            resizeMode="cover"
          />
          <View style={styles.workoutOverlay}>
            <Text style={styles.workoutText}>Today's Workout:</Text>
            <Text style={styles.workoutTitle}>Glute-Focused Legs</Text>
            <TouchableOpacity
              style={styles.logButton}
              onPress={() => router.push({ pathname: '/workouts' })}
            >
              <Text style={styles.logButtonText}>Log Workout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* GymKey Section */}
        <View style={styles.keySectionContainer}>
          <Text style={styles.sectionTitle}>Today's Key</Text>
          <View style={styles.keyCard}>
            <Image
              source={require('../../assets/images/SolidCore.jpg')}
              style={styles.gymkeyImage}
              resizeMode="cover"
            />
            <View style={styles.keyInfoContainer}>
              <View>
                <Text style={styles.gymName}>Solidcore</Text>
                <Text style={styles.gymType}>Reformer Pilates</Text>
                <View style={styles.distanceRow}>
                  <Text style={styles.distanceText}>1.2 miles</Text>
                  <View style={styles.pointsIndicator}>
                    <Text style={styles.keyPointsText}>200</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.activatedButton}>
                <Text style={styles.activatedText}>Activated</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Inactive Keys */}
        <View style={styles.inactiveSection}>
          <Text style={styles.sectionTitle}>Inactive Keys</Text>
          <View style={styles.inactiveBox} />
        </View>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={styles.activeNavIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏋️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👥</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFFFFF',
    height: 60,
  },
  settingsButton: {
    padding: 5,
  },
  settingsIcon: {
    fontSize: 20,
  },
  pointsContainer: {
    backgroundColor: '#5A20CB',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  welcomeSection: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'medium',
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  workoutContainer: {
    height: 180,
    marginHorizontal: 15,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  workoutBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  workoutOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  workoutText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  workoutTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  logButton: {
    backgroundColor: '#5A20CB',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 25,
    marginTop: 5,
  },
  logButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  keySectionContainer: {
    padding: 15,
    backgroundColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  keyCard: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  gymkeyImage: {
    width: '100%',
    height: 150,
  },
  keyInfoContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gymName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gymType: {
    color: '#777777',
    fontSize: 14,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  distanceText: {
    color: '#777777',
    fontSize: 14,
    marginRight: 10,
  },
  pointsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyPointsText: {
    fontWeight: 'bold',
    color: '#777777',
  },
  activatedButton: {
    backgroundColor: '#5A20CB',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  activatedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  inactiveSection: {
    padding: 15,
    marginBottom: 70, // This ensures it stays above the navbar
  },
  inactiveBox: {
    width: '100%',
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  activeNavItem: {
    backgroundColor: '#D4FC79',
    borderRadius: 25,
  },
  navIcon: {
    fontSize: 24,
    color: '#777777',
  },
  activeNavIcon: {
    fontSize: 24,
    color: '#000000',
  },
});