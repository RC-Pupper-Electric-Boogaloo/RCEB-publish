import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';

export default function StartScreen({ navigation }) {
  const { isDarkMode, toggleDarkMode, setIsDarkMode } = useTheme();
const styles = DarkTheme(isDarkMode);

    return (
    <ImageBackground
      source={require('../assets/Taustakuva.jpg')} 
      style={styles.background}
    >
      <View style={styles.containerMainMenu}>
        <TouchableOpacity style={styles.startButton} onPress={() => { navigation.navigate('MainMenu') }}>
          <Text style={styles.startButtonText}>START</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
