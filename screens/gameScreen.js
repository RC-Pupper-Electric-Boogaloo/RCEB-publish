import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { StatusBar } from 'expo-status-bar'
import { useFocusEffect } from '@react-navigation/native'
import entities from '../entities'
import Physics from '../physics'
import { usePlayCollisionSound, usePlayPointSound, usePlayPowerupSound } from '../components/BackgroundMusic'
import GameOverScreen from './gameOverScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'
import { MusicContext } from '../contexts/MusicContext'
import { getRandom } from '../utils/random'
import * as Speech from 'expo-speech'

export default function GameScreen({ navigation }) {
    const [running, setRunning] = useState(true)
    const [currentPoints, setCurrentPoints] = useState(0)
    const [coinCount, setCoinCount] = useState(0)
    const playCollisionSound = usePlayCollisionSound()
    const playPointSound = usePlayPointSound()
    const playPowerupSound = usePlayPowerupSound()
    const stopMusicRef = useRef()
    const [sfxOn, setSfxOn] = useState(false)
    const { musicOn, toggleMusic, setMusic } = useContext(MusicContext)
    const { isDarkMode } = useTheme()
    const styles = DarkTheme(isDarkMode)
    const gameEngine = useRef(null)
    const [isSkinLoaded, setIsSkinLoaded] = useState(false)
    const [activeSkin, setActiveSkin] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [collectedBatteries, setCollectedBatteries] = useState(0)
    const maxBatteries = 7
    const [bonusMode, setBonusMode] = useState(false)

    const backgroundImage = isDarkMode
        ? require('../assets/Taustakuvatakatumma.jpg')
        : require('../assets/Taustakuvatakavaalea.jpg')

    const backdropImage = require('../assets/Taustakuva3ala.png')
    useFocusEffect(
        React.useCallback(() => {
            if (gameEngine.current) {
                gameEngine.current.swap(entities()); // Lataa uudet entiteetit
                gameEngine.current.start(); // Käynnistä uudelleen
            }
    
            return () => {
                if (gameEngine.current) {
                    gameEngine.current.stop(); // Pysäytä pelimoottori
                    gameEngine.current.swap({}); // Tyhjennä tila
                }
            }
        }, [])
    )

    const Bonus = async () => {
        try {
          // Lataa SfxOn-asetuksen arvo
          const savedSfx = await AsyncStorage.getItem('SfxOn')
          const parsedSfx = savedSfx === 'true'
    
          // Aseta tila manuaalisesti
          setSfxOn(parsedSfx)
    
          // Jos SfxOn on päällä, puhe käynnistyy
          if (parsedSfx) {
            // Puhu kaksi tekstiosiota peräkkäin
    
            await Speech.speak("Bounus activate!", {
              language: 'en',
              pitch: 0.3,
              rate: 0.5
            })
          }
    
        } catch (error) {
          console.error('Error pronouncing Bonus:', error)
        }
      }

    useEffect(() => {
        const saveStats = async () => {
            try {
                const savedStats = await AsyncStorage.getItem('GAME_STATS')
                const storedCoinCount = await AsyncStorage.getItem('coinCount')
                let stats = savedStats ? JSON.parse(savedStats) : { totalPoints: 0, totalCoins: 0, gamesPlayed: 0, totalPlayTime: 0 }
                let newCoinCount = storedCoinCount ? JSON.parse(storedCoinCount) : 0

                stats.totalPoints += currentPoints
                stats.totalCoins += coinCount
                stats.gamesPlayed += 1
                stats.totalPlayTime += elapsedTime
                newCoinCount += coinCount

                await AsyncStorage.setItem('coinCount', JSON.stringify(newCoinCount))
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

   
    const loadActiveSkin = async () => {
        try {
            const storedActiveSkin = await AsyncStorage.getItem('activeSkin')
            if (storedActiveSkin) {
                let skinIndex = JSON.parse(storedActiveSkin)
                let skin = skinIndex
                if (skinIndex === 15) {
                    skin = getRandom(0, 14)
                }

                // Assign skin based on the index
                switch (skin) {
                    case 0:
                        setActiveSkin(require('../assets/CharDog.png'))
                        break;
                    case 1:
                        setActiveSkin(require('../assets/rcDocDog.png'))
                        break;
                    case 2:
                        setActiveSkin(require('../assets/rcShopDog.png'))
                        break;
                    case 3:
                        setActiveSkin(require('../assets/rcSilkeneer.png'))
                        break;
                    case 4:
                        setActiveSkin(require('../assets/rcWinWhippet.png'))
                        break;
                    case 5:
                        setActiveSkin(require('../assets/rcProfPoodle.png'))
                        break;
                    case 6:
                        setActiveSkin(require('../assets/rcBusinessBorzoi.png'))
                        break;
                    case 7:
                        setActiveSkin(require('../assets/rcPugLifePupper.png'))
                        break;
                    case 8:
                        setActiveSkin(require('../assets/rcGentlePuppy.png'))
                        break;
                    case 9:
                        setActiveSkin(require('../assets/rcTimeKeeper.png'))
                        break;
                    case 10:
                        setActiveSkin(require('../assets/rcPiratePup.png'))
                        break;
                    case 11:
                        setActiveSkin(require('../assets/rcBonusPuppy.png'))
                        break;
                    case 12:
                        setActiveSkin(require('../assets/rcSgtWoofer.png'))
                        break;
                    case 13:
                        setActiveSkin(require('../assets/rcMeclarBeagle.png'))
                        break;
                    case 14:
                        setActiveSkin(require('../assets/rcPupperOg.png'))
                        break;
                    default:
                        setActiveSkin(require('../assets/CharDog.png')) // Default skin
                        break;
                }
            } else {
                setActiveSkin(require('../assets/CharDog.png')) // Default skin if no saved value
            }
            setIsSkinLoaded(true);
        } catch (error) {
            console.error('Error loading active skin:', error)
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadActiveSkin()
        }, [])
    );

    useEffect(() => {
        if (running) {
            setMusic(require('../assets/bgm2.mp3')) // Set game music
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
        setCoinCount(0)
        setRunning(true)
        setCollectedBatteries(0)

        if (gameEngine.current) {
            gameEngine.current.swap(entities())
            gameEngine.current.start()
        }

        loadActiveSkin()
        // Restart music when game restarts
        setMusic(require('../assets/bgm2.mp3'))
    }

    const handleShowHighscores = () => {
        navigation.navigate('Highscore')
    }

    return (
        <View style={{ flex: 1 }}>
            {isSkinLoaded ? (
                running ? (
                    <>
                        <ImageBackground
                            source={backgroundImage}
                            style={{ flex: 1 }}
                        >
                            <Text style={styles.pointsText}>
                                {currentPoints}
                            </Text>
                            <Text style={{ margin: 20 }}>
                                {bonusMode ? 'Bonus mode activated!' : ''}
                            </Text>
                            <Text style={styles.coinsText}>
                                Coins: {coinCount}
                            </Text>

                            <View
                                style={{
                                    position: 'absolute',
                                    top: 300,
                                    right: 10,
                                    width: 20,
                                    height: 200,
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                    borderRadius: 10,
                                    overflow: 'hidden'
                                }}
                            >
                                {[...Array(maxBatteries)].map((_, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            position: 'absolute',
                                            bottom: (index / maxBatteries) * 100 + '%',
                                            width: '100%',
                                            height: `${100 / maxBatteries}%`,
                                            backgroundColor: index < collectedBatteries ? 'green' : 'gray',
                                            opacity: index < collectedBatteries ? 1 : 0.3
                                        }}
                                    />
                                ))}
                            </View>

                            <GameEngine
                                ref={gameEngine}
                                systems={[Physics]}
                                entities={entities(null, backdropImage, activeSkin)}
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
                                        case 'coin_collected':
                                            if (sfxOn) playPointSound()
                                            setCoinCount(coinCount + 1)
                                            break
                                        case 'miss':
                                            if (sfxOn) playCollisionSound()
                                            setCurrentPoints(Math.max(currentPoints - 1, 0))
                                            break
                                        case 'battery_collected':
                                            if (sfxOn) playPowerupSound()
                                            setCollectedBatteries(prev => Math.min(prev + 1, maxBatteries))
                                            break
                                        case 'bonus_activated':
                                            Bonus()
                                            setBonusMode(true)
                                            break
                                        case 'bonus_tick':
                                            setCollectedBatteries(prev => Math.min(prev - 1, maxBatteries))
                                            break
                                        case 'bonus_ended':
                                            setBonusMode(false)
                                            setCollectedBatteries(0)
                                            break
                                    }
                                }}
                                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                            >
                                <StatusBar style="auto" hidden={true} />
                            </GameEngine>
                        </ImageBackground>
                    </>
                ) : (
                    <GameOverScreen
                        currentPoints={currentPoints}
                        coinCount={coinCount}
                        onRestart={handleRestart}
                        onShowHighscores={handleShowHighscores}
                        navigation={navigation}
                        setMusic={setMusic}
                        musicOn={musicOn}
                        toggleMusic={toggleMusic}
                    />
                )
            ) : (
                <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 24 }}>
                    Loading...
                </Text>
            )}
        </View>
    )
}