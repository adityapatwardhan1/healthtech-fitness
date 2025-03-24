import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  label: string;
  style?: ViewStyle; // Allows custom styling for the button container
  textStyle?: TextStyle; // Allows custom styling for the text inside the button
}

const Button: React.FC<ButtonProps> = ({ label, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]}>
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
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Button;
