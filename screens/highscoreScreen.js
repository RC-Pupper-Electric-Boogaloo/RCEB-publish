import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/Theme';
import DarkTheme from '../styles/theme';

export default function HighscoreScreen({ navigation }) {
    const [highScores, setHighScores] = useState([]);
    const { isDarkMode } = useTheme();
    const styles = DarkTheme(isDarkMode);

    const backgroundImage = isDarkMode
        ? require('../assets/Taustakuvatakatumma.jpg')
        : require('../assets/Taustakuvatakavaalea.jpg');

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
        <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <Text style={styles.scoreHS}>{item}</Text>
        </View>
    );

    return (
        <ImageBackground 
            source={backgroundImage} 
            style={styles.backgroundHighScore}
        >
            <View style={styles.containerHS}>
                <Text style={styles.titleHS}>Highscores</Text>
                <FlatList
                    data={highScores}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.list}
                />
                <TouchableOpacity 
                    style={styles.buttonHS} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonTextHS}>Return</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};
