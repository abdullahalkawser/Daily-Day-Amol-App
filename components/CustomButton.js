import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import SafeLinearGradient from '../components/SafeLinearGradient'

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
      <SafeLinearGradient
        colors={['#4CAF50', '#8BC34A'] || ["#4c669f","#3b5998"]} // Customize your gradient colors
        style={styles.buttonGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </SafeLinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomButton;