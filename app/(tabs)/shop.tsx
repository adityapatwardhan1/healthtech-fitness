import { Text, View, StyleSheet } from 'react-native';
import Button from '@/components/Button';

export default function ShopScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop</Text>
      <View style={styles.footerContainer}>
        <Button label="Buy" />
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
  footerContainer: {
    padding: 2,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});