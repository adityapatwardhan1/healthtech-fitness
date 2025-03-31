import { Text, View, StyleSheet } from 'react-native';
import Button from '@/components/Button';

export default function WorkoutScreen() {
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>My Workouts</Text>
      <View style={styles.myWorkouts}>
        <Button label="Create New Workout" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  header: {
    paddingTop: 50, // Pushes it down from the top safely
    alignItems: 'center', 
  },
  title: {
    paddingTop: 50,
    color: '#fff',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  content: {
    flex: 1, // This takes up the remaining space
    justifyContent: 'center',
    alignItems: 'center',
  },
  myWorkouts: {
    padding: 2,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
