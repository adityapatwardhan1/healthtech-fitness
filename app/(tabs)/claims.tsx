import { Text, View, StyleSheet } from 'react-native';
import Button from '@/components/Button';

export default function ClaimScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Claims</Text>
      <View style={styles.footerContainer}>
        <Button label="Claim" />
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
  text: {
    color: '#fff',
  },
});
