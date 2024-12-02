import React, { useRef, useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { StatusBar } from 'expo-status-bar'
import entities from '../entities/classicentities'
import Physics from '../classicPhysics'
import { usePlayCollisionSound, usePlayPointSound } from '../components/BackgroundMusic'
import { MusicContext } from '../contexts/MusicContext'
import GameOverScreen from './gameOverScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'

export default function GameScreenClassic({ navigation }) {
    const [running, setRunning] = useState(true)
    const [currentPoints, setCurrentPoints] = useState(0)
    const playCollisionSound = usePlayCollisionSound()
    const playPointSound = usePlayPointSound()
    const stopMusicRef = useRef()
    const [sfxOn, setSfxOn] = useState(false)
    const { musicOn, toggleMusic, setMusic } = useContext(MusicContext)
    const { isDarkMode } = useTheme()
    const styles = DarkTheme(isDarkMode)
    const gameEngine = useRef(null)
    const [startTime, setStartTime] = useState(null)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [activeSkin, setActiveSkin] = useState(require('../assets/Char.png'))

    useEffect(() => {
        const saveStats = async () => {
            try {
                const savedStats = await AsyncStorage.getItem('GAME_STATS')
                let stats = savedStats ? JSON.parse(savedStats) : { totalPoints: 0, totalCoins: 0, gamesPlayed: 0, totalPlayTime: 0 }

                stats.totalPoints += currentPoints
                stats.gamesPlayed += 1
                stats.totalPlayTime += elapsedTime


                await AsyncStorage.setItem('GAME_STATS', JSON.stringify(stats))
            } catch (error) {
                console.error('Error saving game stats:', error)
            }
        }

        if (!running && elapsedTime > 0) {
            saveStats()
        }
    }, [running, elapsedTime])

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedSfx = await AsyncStorage.getItem('SfxOn')
                const parsedSfx = savedSfx === 'true'
                setSfxOn(parsedSfx)
            } catch (error) {
                console.error('Error loading settings:', error)
            }
        }

        loadSettings()
    }, [])

    useEffect(() => {
        if (running) {
            setMusic(require('../assets/bgm3.mp3')) // Set game music
            const now = Date.now() // Current timestamp
            setStartTime(now) // Save start time
        }
    }, [setMusic, running])

    const calculateElapsedTime = () => {
        if (startTime) {
            const now = Date.now() // Current timestamp
            const duration = Math.floor((now - startTime) / 1000) // Seconds
            setElapsedTime(duration) // Save game duration in seconds
        }
    }

    useEffect(() => {
        if (!running) {
            calculateElapsedTime()
        }
    }, [running])

    const handleRestart = () => {
        setCurrentPoints(0)
        setRunning(true)
    
        if (gameEngine.current) {
            gameEngine.current.swap(entities())
            gameEngine.current.start()
        }
    
        setMusic(require('../assets/bgm3.mp3')) // Restart music
    }

    const handleShowHighscores = () => {
        navigation.navigate('Highscore')
    }
       
    return (
        <View style={{ flex: 1, backgroundColor: '#b4b4b4' }}>
                {running ? (
                <>
                    <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20, zIndex: 100, position: 'absolute', right: 20, }}>
                        {currentPoints}
                    </Text>

                    <GameEngine
                        ref={gameEngine}
                        systems={[Physics]}
                        entities={entities(null, activeSkin)}
                        running={running}
                        onEvent={(e) => {
                            switch (e.type) {
                                case 'game_over':
                                    if (stopMusicRef.current) stopMusicRef.current()
                                        if (sfxOn) playCollisionSound()
                                        if (gameEngine.current && running) {
                                            gameEngine.current.stop()
                                        }
                                        setRunning(false)
                                        calculateElapsedTime()
                                        break
                                case 'new_point':
                                    if (sfxOn) playPointSound()
                                    setCurrentPoints(currentPoints + 1)
                                    break
                            }
                        }}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                        <StatusBar style="auto" hidden={true} />
                    </GameEngine>
                    </>
                ) : (
                <GameOverScreen
                    currentPoints={currentPoints}
                    onRestart={handleRestart}
                    onShowHighscores={handleShowHighscores}
                    navigation={navigation}
                    setMusic={setMusic}
                    musicOn={musicOn}
                    toggleMusic={toggleMusic}
                />
                )}
            </View>
    )
}
