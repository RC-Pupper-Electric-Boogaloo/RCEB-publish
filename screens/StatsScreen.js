import React, { useState, useEffect, useRef } from 'react';
import { View, Text,TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities/menuentities';
import Physics from '../physics';

const StatsScreen = ({navigation}) => {

  const { isDarkMode, toggleDarkMode, setIsDarkMode } = useTheme();
  const styles = DarkTheme(isDarkMode);
  const gameEngine = useRef(null);
    
  const backgroundImage = isDarkMode
      ? require('../assets/Taustakuvatakatumma.jpg')
      : require('../assets/Taustakuvatakavaalea.jpg');
  
  const backdropImage = require('../assets/Taustakuva4ala.png'); 


  return (
    <ImageBackground
    source={backgroundImage} 
    style={styles.background}
    >
      <GameEngine
            ref={gameEngine}
            systems={[Physics]}
            entities={entities(null, backdropImage)}
            running={true}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
      <StatusBar style="auto" hidden={true} />
    </GameEngine>
    <View style={styles.container}>
        <Text style={styles.title}>AllTimeStats</Text>
        <View style={styles.optionsContainer}>
       <Text style={styles.Label}>Total Points: </Text>
       <Text style={styles.Label}>Total Time Spent: </Text>
       <Text style={styles.Label}>Total Coins: </Text>
       <Text style={styles.Label}>Games Played: </Text>
       </View>
       <TouchableOpacity style={[styles.button, styles.returnButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonTitle}>Return</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

export default StatsScreen;

