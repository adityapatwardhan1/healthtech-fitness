import { StyleSheet, View, Pressable, Text } from 'react-native';


type Props = {
  label: string;
};

export default function Button({ label }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
    
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',  // This centers the text horizontally
    justifyContent: 'center',  // This centers the text vertically
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',  // This ensures the text is centered within the row
  },
});
