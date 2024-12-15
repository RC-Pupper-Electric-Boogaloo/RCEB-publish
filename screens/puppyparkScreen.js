import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { StatusBar } from 'expo-status-bar'
import { useFocusEffect } from '@react-navigation/native'
import entities from '../entities/parkentities'
import Physics from '../parkphysics'
import { usePlayCollisionSound, usePlayPointSound, usePlayPowerupSound } from '../components/BackgroundMusic'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'
import { MusicContext } from '../contexts/MusicContext'
import { getRandom } from '../utils/random'

export default function PuppyparkScreen({ navigation }) {
    const [running, setRunning] = useState(true)
    const [currentPoints, setCurrentPoints] = useState(0)
    const [boneCount, setBoneCount] = useState(0)
    const [coinCount, setCoinCount] = useState(0)
    const [chocoCount, setChocoCount] = useState(0)
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
    const [multiplier, setMultiplier] = useState(1)
    const maxBatteries = 100

    const backgroundImage = isDarkMode
        ? require('../assets/Taustakuvatakatumma.jpg')
        : require('../assets/Taustakuvatakavaalea.jpg')

    const backdropImage = require('../assets/Taustakuva10ala.png')
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



    useEffect(() => {
        const saveStats = async () => {
            try {
                const savedStats = await AsyncStorage.getItem('GAME_STATS')
                const storedCoinCount = await AsyncStorage.getItem('coinCount')  
                const Puppyparks = await AsyncStorage.getItem('Puppyparks')        
                let stats = savedStats ? JSON.parse(savedStats) : { totalPoints: 0, totalCoins: 0, totalChoco: 0, gamesPlayed: 0, totalPlayTime: 0 }
                let newCoinCount = storedCoinCount ? JSON.parse(storedCoinCount) : 0
                let newPuppyparks = Puppyparks ? JSON.parse(storedCoinCount) : 0

                stats.totalPoints += boneCount
                stats.totalCoins += coinCount
                stats.totalChoco += chocoCount
                stats.gamesPlayed += 1
                stats.totalPlayTime += elapsedTime
                newCoinCount += coinCount
                newPuppyparks += 1


                await AsyncStorage.setItem('coinCount', JSON.stringify(newCoinCount))
                await AsyncStorage.setItem('GAME_STATS', JSON.stringify(stats))
                await AsyncStorage.setItem('Puppyparks', JSON.stringify(newPuppyparks))
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
            const savedSkins = await AsyncStorage.getItem('purchasedSkins')
            let purchasedSkins = savedSkins ? JSON.parse(savedSkins) : []
            if (!purchasedSkins.includes(0)) {
                purchasedSkins.push(0);
      
                await AsyncStorage.setItem('purchasedSkins', JSON.stringify(purchasedSkins))
            }

            if (storedActiveSkin) {
                let skinIndex = JSON.parse(storedActiveSkin)
                let skin = skinIndex
            
                const getValidSkin = () => {
                    do {
                        skin = getRandom(0, 23)
                    } while (!purchasedSkins.includes(skin))
                    return skin
                }
            
                if (skinIndex === 24 || !purchasedSkins.includes(skin)) {
                    skin = getValidSkin()
                }

                // Assign skin based on the index
                switch (skin) {
                    case 0:
                        setActiveSkin(require('../assets/CharDog.png'))
                        break
                    case 1:
                        setActiveSkin(require('../assets/rcDocDog.png'))
                        break
                    case 2:
                        setActiveSkin(require('../assets/rcShopDog.png'))
                        break
                    case 3:
                        setActiveSkin(require('../assets/rcSilkeneer.png'))
                        break
                    case 4:
                        setActiveSkin(require('../assets/rcBreakBernard.png'))
                        break
                    case 5:
                        setActiveSkin(require('../assets/rcProfPoodle.png'))
                        break
                    case 6:
                        setActiveSkin(require('../assets/rcBusinessBorzoi.png'))
                        break
                    case 7:
                        setActiveSkin(require('../assets/rcPugLifePupper.png'))
                        break
                    case 8:
                        setActiveSkin(require('../assets/rcRoyalAfgan.png'))
                        break
                    case 9:
                        setActiveSkin(require('../assets/rcGentlePuppy.png'))
                        break
                    case 10:
                        setActiveSkin(require('../assets/rcTimeKeeper.png'))
                        break
                    case 11:
                        setActiveSkin(require('../assets/rcPiratePup.png'))
                        break
                    case 12:
                        setActiveSkin(require('../assets/rcBonusPuppy.png'))
                        break
                    case 13:
                        setActiveSkin(require('../assets/rcSgtWoofer.png'))
                        break
                    case 14:
                        setActiveSkin(require('../assets/rcMeclarBeagle.png'))
                        break
                    case 15:
                        setActiveSkin(require('../assets/rcPowerPuppy.png'))
                        break
                    case 16:
                        setActiveSkin(require('../assets/rcWinWhippet.png'))
                        break
                    case 17:
                        setActiveSkin(require('../assets/rcFluffers.png'))
                        break
                    case 18:
                        setActiveSkin(require('../assets/rcCrashBuldog.png'))
                        break
                    case 19:
                        setActiveSkin(require('../assets/rcLePapillon.png'))
                        break                    
                    case 20:
                        setActiveSkin(require('../assets/rcCheemsShiba.png'))
                        break                    
                    case 21:
                        setActiveSkin(require('../assets/rcTibetanTycoon.png'))
                        break                    
                    case 22:
                        setActiveSkin(require('../assets/rcHoward.png'))
                        break
                    case 23:
                        setActiveSkin(require('../assets/rcPupperOg.png'))
                        break
                    default:
                        setActiveSkin(require('../assets/CharDog.png')) // Default skin
                        break
                }
            } else {
                setActiveSkin(require('../assets/CharDog.png')) // Default skin if no saved value
            }
            setIsSkinLoaded(true);
        } catch (error) {
            console.error('Error loading active skin:', error)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            loadActiveSkin()
        }, [])
    )

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


    return (
        <View style={{ flex: 1 }}>
            {isSkinLoaded ? (
                    <>
                        <ImageBackground
                            source={backgroundImage}
                            style={{ flex: 1 }}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 300,
                                    right: 10,
                                    width: 20,
                                    height: 200,
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                    borderRadius: 10,
                                    zIndex: 10000,
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
                                            backgroundColor: index < collectedBatteries ? 'pink' : 'gray',
                                            opacity: index < collectedBatteries ? 1 : 0.5
                                        }}
                                    />
                                ))}
                                <Image source={require('../assets/heart.png')} style={styles.coinImage} />
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
                                            if (gameEngine.current && running) {
                                                gameEngine.current.stop()
                                            }   
                                            const newCoinCount = Math.floor(getRandom(5, 50) * multiplier)
                                            const newBoneCount = Math.floor(getRandom(5, 50) * multiplier)
                                            const newChocoCount = Math.floor(getRandom(2, 25) * multiplier)
                                            console.log("used multiplier: ", multiplier)
                                            
                                            setCoinCount(newCoinCount)
                                            setBoneCount(newBoneCount)
                                            setChocoCount(newChocoCount)
                                            Alert.alert( "Treasure", `Puppy left you ${newCoinCount} Coins, ${newBoneCount} Bones, and ${newChocoCount} Choco! Thank you pupper!`                                            )
                                            calculateElapsedTime()
                                            setRunning(false)
                                            break
                                        case 'petted':
                                            if (sfxOn) playPowerupSound()
                                            setCollectedBatteries(prev => Math.min(prev + 1, maxBatteries))
                                            break
                                        case 'treat_collected':
                                            if (sfxOn) playPointSound()
                                            
                                            setMultiplier(multiplier+0.1)
                                            console.log("new multiplier: ", multiplier);
                                            
                                            break
                                    }
                                }}
                                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                            >
                                <StatusBar style="auto" hidden={true} />
                            </GameEngine>
                            <View style={styles.optionsContainer}>
                                <View style={styles.petColorContainer}>
                                    <Text style={styles.shopHeader}>
                                        <Image source={require('../assets/Parksign.png')} style={styles.signImage} />
                                    </Text>
                        {/*    <View style={styles.shopButtonContainer}>
                                    <TouchableOpacity style={[styles.shopButton]}  onPress={() => gameEngine.current.dispatch({ type: 'move_treat' })}>
                                        <Image source={require('../assets/Treat.png')} style={styles.image} />
                                        <Text style={styles.shopButtonTitleOrange}>Give treat</Text>
                                    </TouchableOpacity>            
                                    <TouchableOpacity style={[styles.shopButton]} onPress={() => alert('Watch Ad will be added later')}>
                                        <Text style={styles.shopButtonTitleOrange}>WATCH AD with puppy{'\n'}</Text>
                                        <Text style={styles.shopButtonTitle}>GET 50 <Image source={require('../assets/heart2.png')} style={styles.coinImageSmall} /></Text>
                                    </TouchableOpacity>            
                                </View> */}
                                    </View>
                            <View style={styles.optionButtonContainer}>
                                    <TouchableOpacity style={styles.returnButton} onPress={() => navigation.goBack()}>
                                    <Text style={styles.buttonTitle}>RETURN</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </>
            ) : (
                <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 24 }}>
                    Loading...
                </Text>
            )}
        </View>
    )
}