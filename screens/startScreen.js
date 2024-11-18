import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';
import { GameEngine } from 'react-native-game-engine';
import BackgroundMusic from '../components/BackgroundMusic';
import entities from '../entities/menuentities';
import Physics from '../physics';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function StartScreen({ navigation }) {
  const styles = DarkTheme(isDarkMode);
  const { isDarkMode } = useTheme();
  const gameEngine = useRef(null);
  const stopMusicRef = useRef();
  const [musicOn, setMusicOn] = useState(false);

  const backgroundImage = isDarkMode
    ? require('../assets/Taustakuvatakatumma.jpg')
    : require('../assets/Taustakuvatakavaalea.jpg');

  const backdropImage = require('../assets/Taustakuvaala.png'); 

  useEffect(() => {
    const loadSettings = async () => {
        try {
            const savedMusic = await AsyncStorage.getItem('MusicOn');
            const parsedMusic = savedMusic === 'true';
            setMusicOn(parsedMusic);
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    };

    loadSettings();
}, []);

    return (
    <ImageBackground
      source={backgroundImage} 
      style={styles.background}
    > 
    {musicOn && <BackgroundMusic stopRef={stopMusicRef} source={require('../assets/bgm2.mp3')} />}       
    <GameEngine
      ref={gameEngine}
      systems={[Physics]}
      entities={entities(null, backdropImage)}
      running={true}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <StatusBar style="auto" hidden={true} />
    </GameEngine>
      <View style={styles.containerMainMenu}>
      <TouchableOpacity 
  style={styles.startButton} 
  onPress={() => {
    if (stopMusicRef.current) {
      stopMusicRef.current(); // Pysäytä musiikki
    }
    navigation.navigate('MainMenu'); // Navigoi päävalikkoon
  }}
>
  <Text style={styles.startButtonText}>START</Text>
</TouchableOpacity>

      </View>
    </ImageBackground>
  );
};
