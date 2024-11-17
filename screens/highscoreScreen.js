import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/Theme';

export default function HighscoreScreen({ navigation }) {
    const [highScores, setHighScores] = useState([]);
    const { isDarkMode } = useTheme();

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
            <Text style={styles.score}>{item}</Text>
        </View>
    );

    return (
        <ImageBackground 
            source={backgroundImage} 
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Highscores</Text>
                <FlatList
                    data={highScores}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.list}
                />
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
        paddingTop: 50,
        paddingBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 10,
        width: '90%',
        paddingTop: 40, 
        paddingBottom: 40, 
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    list: {
        width: '100%',
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    rank: {
        fontSize: 20,
        color: '#FFD700',
    },
    score: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
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
