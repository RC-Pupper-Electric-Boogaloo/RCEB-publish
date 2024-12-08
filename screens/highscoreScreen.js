import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from "react-native"
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'
import { GameEngine } from 'react-native-game-engine'
import entities from '../entities/menuentities'
import Physics from '../physics'
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function HighscoreScreen({ navigation }) {
    const [highScores, setHighScores] = useState([])
    const { isDarkMode } = useTheme()
    const styles = DarkTheme(isDarkMode)
    const gameEngine = useRef(null)
    const [isClassicMode, setIsClassicMode] = useState(false)
    const insets = useSafeAreaInsets()

    const backgroundImage = isDarkMode
        ? require('../assets/Taustakuvatakatumma.jpg')
        : require('../assets/Taustakuvatakavaalea.jpg')
    const backdropImage = require('../assets/Taustakuva7ala.png')

    useEffect(() => {
        const loadHighScores = async () => {
            try {
                // Check ClassicOn setting
                const classicOnSetting = await AsyncStorage.getItem('ClassicOn')
                const isClassic = classicOnSetting === 'true'
                setIsClassicMode(isClassic)

                // Load the correct high scores
                const key = isClassic ? 'classicHIGHSCORES' : 'HIGHSCORES'
                const savedScores = await AsyncStorage.getItem(key)
                let scoresArray = savedScores ? JSON.parse(savedScores) : []
                scoresArray = scoresArray.sort((a, b) => b - a).slice(0, 10)
                setHighScores(scoresArray)
            } catch (error) {
                console.error("Error loading high scores:", error)
            }
        }

        loadHighScores()
    }, [])

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
                <View style={styles.colorContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.screenHeader}>Highscores</Text>
                        {isClassicMode && (
                            <Text style={styles.gameOverText}>classic</Text>
                        )}
                    </View>
                    <ScrollView persistentScrollbar={true} contentContainerStyle={styles.scrollViewContent}>
                        {highScores.map((item, index) => (
                            <View key={index} style={styles.row}>
                                <Text style={styles.label}>{index + 1}.</Text>
                                <Text style={styles.labelOrange}>{item.initials}</Text>
                                <Text style={styles.label}>{item.points}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.returnButton}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonTitle}>RETURN</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </ImageBackground>
    )
}