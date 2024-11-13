import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,SafeAreaView, StyleSheet } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import entities from './entities';
import Physics from './physics';
import { ThemeProvider } from './components/Theme';
import BackgroundMusic, { usePlayCollisionSound, usePlayPointSound } from './components/BackgroundMusic';
import HighscoreScreen from './screens/highscoreScreen';
import OptionScreen from './screens/optionScreen';
import ShopScreen from './screens/shopScreen';
import GameScreen from './screens/gameScreen';
import MainMenuScreen from './screens/mainMenuScreen';
import StartScreen from './screens/startScreen';

export default function App() {
 return(
    <ThemeProvider>
    <GameScreen/>
  </ThemeProvider>
  
    );
}
