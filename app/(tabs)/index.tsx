import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

//import Button from '@/components/Button';
import Button from '@/components/Button';
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top header with settings */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
        <View style={styles.heartContainer}>
          <Text style={styles.heartIcon}>♡</Text>
        </View>
      </View>

      {/* Main content area */}
      <View style={styles.contentContainer}>
        {/* Workout Section */}
        <View style={styles.workoutContainer}>
          <Text style={styles.workoutText}>Today's Workout:</Text>
          <Text style={styles.workoutTitle}>Glute-Focused Legs</Text>
          <TouchableOpacity style={styles.logButton}>
            <Text style={styles.logButtonText}>Log Workout</Text>
          </TouchableOpacity>
        </View>

        {/* GymKey Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Today's Gymkey</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/300x100/0066cc/ffffff' }}
            style={styles.gymkeyImage}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Unclaimed Section - fixed position just above navbar */}
      <View style={styles.unclaimedSection}>
        <Text style={styles.sectionTitle}>Unclaimed</Text>
        <View style={styles.unclaimedBox}></View>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏋️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👥</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⋯</Text>
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
  heartContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 15,
    padding: 5,
    width: 70,
    alignItems: 'flex-start',
  },
  heartIcon: {
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
  },
  workoutContainer: {
    backgroundColor: '#8C8C8C',
    padding: 20,
    alignItems: 'center',
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
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 25,
    marginTop: 5,
  },
  logButtonText: {
    color: '#000000',
  },
  sectionContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gymkeyImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  unclaimedSection: {
    padding: 15,
    marginBottom: 70, // This ensures it stays above the navbar
  },
  unclaimedBox: {
    width: '100%',
    height: 100,
    backgroundColor: '#F0F0F0',
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
  },
  navIcon: {
    fontSize: 24,
  },
});