import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  label: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void; // Added onPress prop
}

const Button: React.FC<ButtonProps> = ({ label, style, textStyle, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%', 
    padding: 10,
    backgroundColor: '#4CAF5F',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Button;
