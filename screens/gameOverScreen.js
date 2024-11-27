import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../components/Theme'
import DarkTheme from '../styles/theme'
import { MusicContext } from '../contexts/MusicContext'

const GameOverScreen = ({ currentPoints, coinCount, onRestart, onShowHighscores, navigation }) => {
    const { isDarkMode } = useTheme()
    const styles = DarkTheme(isDarkMode)
    const [highScores, setHighScores] = useState([])
    const { setMusic } = useContext(MusicContext)
    const [isClassicMode, setIsClassicMode] = useState(false)

    const backgroundImage = isDarkMode
        ? require('../assets/GameOverDark.jpg')
        : require('../assets/GameOver.jpg')

    // Set the background music for the game over screen
    useEffect(() => {
        setMusic(require('../assets/bgmenu.mp3'))  // Main menu music
    }, [setMusic])

    useEffect(() => {
        const saveAndLoadScores = async () => {
            // Check if Classic Mode is enabled
            const classicOnSetting = await AsyncStorage.getItem('ClassicOn')
            const isClassic = classicOnSetting === 'true'
            setIsClassicMode(isClassic)

            // Save the current score to the appropriate key
            if (currentPoints) {
                await savePoints(currentPoints, isClassic)
            }

            // Load updated high scores
            const scores = await loadHighScores(isClassic)
            setHighScores(scores)
        }

        saveAndLoadScores()
    }, [currentPoints])

    const savePoints = async (points, isClassic) => {
        try {
            const key = isClassic ? 'classicHIGHSCORES' : 'HIGHSCORES'
            const savedScores = await AsyncStorage.getItem(key)
            let scoresArray = savedScores ? JSON.parse(savedScores) : []
            scoresArray.push(points)
            await AsyncStorage.setItem(key, JSON.stringify(scoresArray))
        } catch (e) {
            console.error("Failed to save points", e)
        }
    }

    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.backgroundGameOver}
        >
            <View style={styles.containerGameOver}>
                <Text style={styles.pointsTextGameOver}>Your Score: {currentPoints}</Text>
                {coinCount > 0 && (
                <View style={styles.coinsContainer}>
                    <Image source={require('../assets/Coin.png')} style={styles.coinImage} />
                    <Text style={styles.coinsTextGameOver}>x {coinCount}</Text>
                </View>
                )}
                <TouchableOpacity style={styles.buttonGameover} onPress={onRestart}>
                    <Text style={styles.buttonTextGameOver}>Play Again</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonGameover, { marginTop: 10 }]} onPress={onShowHighscores}>
                    <Text style={styles.buttonTextGameOver}>Highscores</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonGameover, { marginTop: 10 }]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonTextGameOver}>Main Menu</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default GameOverScreen