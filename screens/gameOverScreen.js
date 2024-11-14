import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useTheme } from '../components/Theme';  
const GameOverScreen = ({ onRestart, onShowHighscores }) => {
    const { isDarkMode } = useTheme();  


    const backgroundImage = isDarkMode
        ? require('../assets/GameOverDark.jpg')  
        : require('../assets/GameOver.jpg');  

    return (
        <ImageBackground 
            source={backgroundImage} 
            style={styles.background}
        >
            <View style={styles.container}>

                <TouchableOpacity style={styles.button} onPress={onRestart}>
                    <Text style={styles.buttonText}>Play Again</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={onShowHighscores}>
                    <Text style={styles.buttonText}>View Highscores</Text>
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
