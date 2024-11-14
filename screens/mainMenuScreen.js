import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';


export default function MainMenuScreen({ navigation }) {
const { isDarkMode, toggleDarkMode, setIsDarkMode } = useTheme();
const styles = DarkTheme(isDarkMode);
    return (
    <ImageBackground
      source={require('../assets/Taustakuva.jpg')} 
      style={styles.background}
    >
      <View style={styles.containerMainMenu}>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => { navigation.navigate('Game') }}>
            <Text style={styles.ButtonMainMenuText}>PLAY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => { navigation.navigate('Highscore') }}>
            <Text style={styles.ButtonMainMenuText}>HIGHSCORES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => navigation.navigate('Options')}>
            <Text style={styles.ButtonMainMenuText}>OPTIONS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.ButtonMainMenuText}>SHOP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu}  onPress={() => navigation.navigate('Stats')}>
            <Text style={styles.ButtonMainMenuText}>AllTimeStats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu}  onPress={() => navigation.goBack()}>
            <Text style={styles.ButtonMainMenuText}>Return</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};