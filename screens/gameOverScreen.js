import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/Theme';

const GameOverScreen = ({ currentPoints, coinCount, onRestart, onShowHighscores, navigation }) => {
    const { isDarkMode } = useTheme();
    const [highScores, setHighScores] = useState([]);

    const backgroundImage = isDarkMode
        ? require('../assets/GameOverDark.jpg')
        : require('../assets/GameOver.jpg');

        useEffect(() => {
            const saveAndLoadScores = async () => {
              if (currentPoints) await savePoints(currentPoints);
              setHighScores(scores);
            };
            saveAndLoadScores();
          }, [currentPoints]);
    
          const savePoints = async (currentPoints) => {
            try {
                const savedScores = await AsyncStorage.getItem('HIGHSCORES'); // Ladataan nykyiset highscoret AsyncStorageista
                let scoresArray = savedScores ? JSON.parse(savedScores) : [];
                scoresArray.push(currentPoints); // Lisää nykyiset pisteet listaan
                await AsyncStorage.setItem('HIGHSCORES', JSON.stringify(scoresArray));  // Tallennetaan päivitetty lista takaisin AsyncStorageiin
            } catch (e) {
                console.error("Pisteiden tallennus epäonnistui", e);
            }
        };

    return (
        <ImageBackground 
            source={backgroundImage} 
            style={styles.background}
        >
            <View style={styles.container}>
                
                <Text style={styles.pointsText}>Your Score: {currentPoints}</Text> 

                <View style={styles.coinsContainer}>
                    <Image source={require('../assets/Coin.png')} style={styles.coinImage} />
                    <Text style={styles.coinsText}>x {coinCount}</Text>  
                </View>

                <TouchableOpacity style={styles.button} onPress={onRestart}>
                    <Text style={styles.buttonText}>Play Again</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={onShowHighscores}>
                    <Text style={styles.buttonText}>Highscores</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, { marginTop: 10 }]} 
                    onPress={() => navigation.goBack()} 
                >
                    <Text style={styles.buttonText}>Main Menu</Text>
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
    gameOverText: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'red',
    },
    pointsText: {
        fontSize: 30,
        color: 'white',
        marginBottom: 20,
    },
    coinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    coinImage: {
        width: 30,  
        height: 30, 
        marginRight: 10,
    },
    coinsText: {
        fontSize: 25,
        color: 'white',
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

export default GameOverScreen;
