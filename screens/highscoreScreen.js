import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities/menuentities';
import Physics from '../physics';

export default function HighscoreScreen({ navigation }) {
    const [highScores, setHighScores] = useState([]);
    const { isDarkMode } = useTheme();
    const styles = DarkTheme(isDarkMode);
    const gameEngine = useRef(null);
  
    const backgroundImage = isDarkMode
    ? require('../assets/Taustakuvatakatumma.jpg')
    : require('../assets/Taustakuvatakavaalea.jpg');
  
    const backdropImage = require('../assets/Taustakuva7ala.png'); 

    useEffect(() => {
        const loadHighScores = async () => {
            try {
                const savedScores = await AsyncStorage.getItem('HIGHSCORES');
                let scoresArray = savedScores ? JSON.parse(savedScores) : [];
                scoresArray = scoresArray.sort((a, b) => b - a).slice(0, 10); 
                setHighScores(scoresArray);
            } catch (error) {
                console.error("Error loading high scores:", error);
            }
        };

        loadHighScores();
    }, []);

    const renderItem = ({ item, index }) => (
        <View style={styles.Hitem}>
            <Text style={styles.Hrank}>{index + 1}.</Text>
            <Text style={styles.Hscore}>{item}</Text>
        </View>
    );

    return (
        <ImageBackground 
            source={backgroundImage} 
            style={styles.Hbackground}
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
            <View style={styles.Hcontainer}>
                
                <Text style={styles.Htitle}>Highscores</Text>
                <FlatList
                    data={highScores}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.Hlist}
                />       
                <TouchableOpacity 
                    style={styles.Hbutton} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.HbuttonText}>Return</Text>            
                </TouchableOpacity> 
            </View>
        </ImageBackground>
    );
};
