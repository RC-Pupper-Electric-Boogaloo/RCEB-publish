import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../components/Theme'
import DarkTheme from '../styles/theme'
import { MusicContext } from '../contexts/MusicContext'

const GameOverScreen = ({ currentPoints, coinCount, onRestart, onShowHighscores, navigation }) => {
    const { isDarkMode } = useTheme()
    const styles = DarkTheme(isDarkMode)
    const [highScores, setHighScores] = useState([])
    const [initials, setInitials] = useState('')
    const [isHighScore, setIsHighScore] = useState(false)
    const { setMusic } = useContext(MusicContext)
    const [isClassicMode, setIsClassicMode] = useState(false)

    const backgroundImage = isDarkMode
        ? require('../assets/GameOverDark.jpg')
        : require('../assets/GameOver.jpg')

    useEffect(() => {
        const checkHighScore = async () => {
            const key = isClassicMode ? 'classicHIGHSCORES' : 'HIGHSCORES'
            const savedScores = await AsyncStorage.getItem(key)
            const scoresArray = savedScores ? JSON.parse(savedScores) : []
            const isTopScore = scoresArray.length < 10 || currentPoints > Math.min(...scoresArray.map(s => s.points))

            if (isTopScore) {
                setIsHighScore(true)
            }
        }

        const loadSettings = async () => {
            const classicOnSetting = await AsyncStorage.getItem('ClassicOn')
            setIsClassicMode(classicOnSetting === 'true')
        }

        loadSettings()
        checkHighScore()
    }, [currentPoints])

    const saveHighScore = async () => {
        setInitials(initials.toUpperCase())
        const key = isClassicMode ? 'classicHIGHSCORES' : 'HIGHSCORES'
        const savedScores = await AsyncStorage.getItem(key)
        const scoresArray = savedScores ? JSON.parse(savedScores) : []

        scoresArray.push({ initials, points: currentPoints })
        const sortedScores = scoresArray
            .sort((a, b) => b.points - a.points)
            .slice(0, 10)

        await AsyncStorage.setItem(key, JSON.stringify(sortedScores))
        setHighScores(sortedScores)
        setIsHighScore(false) // Hide input after saving
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

                {isHighScore ? (
                    <View>
                        <Text style={styles.highScoreText}>New High Score! Enter your initials:</Text>
                        <TextInput
                            style={styles.initialsInput}
                            value={initials}
                            maxLength={3}
                            onChangeText={(text) => setInitials(text.toUpperCase())}
                            placeholder="ABC"
                            placeholderTextColor={'#FD8A0B'}
                            autoCapitalize='characters'
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={saveHighScore}>
                            <Text style={styles.buttonTextGameOver}>Save Score</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
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
                    </>
                )}
            </View>
        </ImageBackground>
    )
}

export default GameOverScreen
