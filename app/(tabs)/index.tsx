import { Text, View, StyleSheet } from 'react-native';
import Button from '@/components/Button';

export default function ShopScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.footerContainer}>
        <View style={styles.buttonContainer}>

          <Button label="Balance" />
        </View>
        <View style={styles.buttonContainer}>

          <Button label="Claims" />
        </View>
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
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    padding: 2,
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 12,
    
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: '#fff',
  },
});
