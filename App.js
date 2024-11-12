import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import entities from './entities';
import Physics from './physics';
import BackgroundMusic, { usePlayCollisionSound, usePlayPointSound } from './components/BackgroundMusic';
import HighscoreScreen from './screens/highscoreScreen';

export default function App() {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}
                onPress={() => { }}
            >
                <Text style={styles.buttonText}>
                    START
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'black',
        paddingHorizontal: 30,
        paddingVertical: 10,
        width: '70%',
        marginBottom: 20
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 30,
        textAlign: 'center'
    }
});
