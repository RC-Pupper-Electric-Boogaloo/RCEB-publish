import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,SafeAreaView, StyleSheet } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import entities from './entities';
import Physics from './physics';
import BackgroundMusic, { usePlayCollisionSound, usePlayPointSound } from './components/BackgroundMusic';
import HighscoreScreen from './screens/highscoreScreen';
import OptionScreen from './screens/optionScreen';
import ShopScreen from './screens/shopScreen';
import GameScreen from './screens/gameScreen';

export default function App() {

            <GameScreen />
    );
}
