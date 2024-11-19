import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../components/Theme';
import { GameEngine } from 'react-native-game-engine';
import AsyncStorage from '@react-native-async-storage/async-storage';
import entities from '../entities/menuentities';
import Physics from '../physics';

const StatsScreen = ({ navigation }) => {
    const { isDarkMode } = useTheme();
    const [stats, setStats] = useState({ totalPoints: 0, totalCoins: 0, gamesPlayed: 0 });
    const gameEngine = useRef(null);

    const backgroundImage = isDarkMode
        ? require('../assets/Taustakuvatakatumma.jpg')
        : require('../assets/Taustakuvatakavaalea.jpg');

        const backdropImage = require('../assets/Taustakuva4ala.png'); 

    useEffect(() => {
        const loadStats = async () => {
            try {
                const savedStats = await AsyncStorage.getItem('GAME_STATS');
                if (savedStats) {
                    setStats(JSON.parse(savedStats));
                }
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        };

        loadStats();
    }, []);

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
                <Text style={styles.title}>All-Time Stats</Text>
                <Text style={styles.statsText}>Total Points: {stats.totalPoints}</Text>
                <Text style={styles.statsText}>Total Coins: {stats.totalCoins}</Text>
                <Text style={styles.statsText}>Games Played: {stats.gamesPlayed}</Text>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Return</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    statsText: {
        fontSize: 20,
        color: 'white',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default StatsScreen;
