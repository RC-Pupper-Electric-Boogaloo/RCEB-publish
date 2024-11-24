import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import entities from '../entities';
import Physics from '../physics';
import { usePlayCollisionSound, usePlayPointSound } from '../components/BackgroundMusic';
import GameOverScreen from './gameOverScreen'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';
import { MusicContext } from '../contexts/MusicContext';

export default function GameScreen({ navigation }) {
    const [running, setRunning] = useState(true); 
    const [currentPoints, setCurrentPoints] = useState(0);
    const [coinCount, setCoinCount] = useState(0);  
    const playCollisionSound = usePlayCollisionSound();
    const playPointSound = usePlayPointSound();
    const stopMusicRef = useRef();
    const [sfxOn, setSfxOn] = useState(false);
    const { musicOn, toggleMusic, setMusic } = useContext(MusicContext);
    const { isDarkMode } = useTheme();
    const styles = DarkTheme(isDarkMode);
    const gameEngine = useRef(null);
    const [isSkinLoaded, setIsSkinLoaded] = useState(false);
    const [activeSkin, setActiveSkin] = useState(null);
  
    const backgroundImage = isDarkMode
      ? require('../assets/Taustakuvatakatumma.jpg')
      : require('../assets/Taustakuvatakavaalea.jpg');
    
    const backdropImage = require('../assets/Taustakuva3ala.png'); 

    useEffect(() => {
        const saveStats = async () => {
            try {
                const savedStats = await AsyncStorage.getItem('GAME_STATS');
                const storedCoinCount = await AsyncStorage.getItem('coinCount');
                let stats = savedStats ? JSON.parse(savedStats) : { totalPoints: 0, totalCoins: 0, gamesPlayed: 0 };
                let newCoinCount = storedCoinCount ? JSON.parse(storedCoinCount) : 0; 
    
                stats.totalPoints += currentPoints;
                stats.totalCoins += coinCount;
                stats.gamesPlayed += 1;
                
                newCoinCount += coinCount;

                await AsyncStorage.setItem('coinCount', JSON.stringify(newCoinCount));
                await AsyncStorage.setItem('GAME_STATS', JSON.stringify(stats));
            } catch (error) {
                console.error('Error saving game stats:', error);
            }
        };
    
        if (!running) {
            saveStats();
        }
    }, [running]);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedSfx = await AsyncStorage.getItem('SfxOn');
                const parsedSfx = savedSfx === 'true';
                setSfxOn(parsedSfx);
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };

        loadSettings();
    }, []);

    useEffect(() => {
        const loadActiveSkin = async () => {
            try {
                const storedActiveSkin = await AsyncStorage.getItem('activeSkin');
    
                if (storedActiveSkin) {
                    const skinIndex = JSON.parse(storedActiveSkin);
    
                    switch (skinIndex) {
                        case 0:
                            setActiveSkin(require('../assets/CharDog.png'));
                            break;
                        case 1:
                            setActiveSkin(require('../assets/rcDocDog.png'));
                            break;
                        case 2:
                            setActiveSkin(require('../assets/rcShopDog.png'));
                            break;
                        case 3:
                            setActiveSkin(require('../assets/rcSilkeneer.png'));
                            break;
                        case 4:
                            setActiveSkin(require('../assets/rcWinWhippet.png'));
                            break;
                        case 5:
                            setActiveSkin(require('../assets/rcProfPoodle.png'));
                            break;
                        case 6:
                            setActiveSkin(require('../assets/S6.png'));
                            break;
                        case 7:
                            setActiveSkin(require('../assets/S8.png'));
                            break;
                        default:
                            setActiveSkin(require('../assets/CharDog.png')); // Oletus-skini, jos arvo ei ole tunnistettu
                            break;
                    }
                } else {
                    setActiveSkin(require('../assets/CharDog.png')); // Asetetaan oletus-skini, jos ei ole tallennettua arvoa
                }
    
                setIsSkinLoaded(true);  // Ladataan skini, ja asetetaan, että skini on ladattu
            } catch (error) {
                console.error('Error loading active skin:', error);
            }
        };
    
        loadActiveSkin();
    }, []);
    
    // Varmistetaan, että peliin asetetaan oikea musiikki (bgm2.mp3) kun peli käynnistyy
    useEffect(() => {
        if (running) {
            setMusic(require('../assets/bgm2.mp3'));  // Asetetaan pelimusiikki
        }
    }, [setMusic, running]);

    const handleRestart = () => {
        setCurrentPoints(0);
        setCoinCount(0);  
        setRunning(true);

        if (gameEngine.current) {
            gameEngine.current.swap(entities());  
            gameEngine.current.start();  
        }

        // Käynnistetään musiikki aina, kun peli aloitetaan uudelleen
        setMusic(require('../assets/bgm2.mp3'));
    };

    const handleShowHighscores = () => {
        navigation.navigate('Highscore');
    };

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

                        <Text style={styles.coinsText}>
                            Coins: {coinCount}  
                        </Text>
                        <GameEngine
                            ref={gameEngine}
                            systems={[Physics]}
                            entities={entities(null, backdropImage, activeSkin)}
                            running={running}
                            onEvent={(e) => {
                                switch (e.type) {
                                    case 'game_over':
                                        if (stopMusicRef.current) stopMusicRef.current();
                                        if (sfxOn) playCollisionSound(); 
                                        if (gameEngine.current && running) {
                                            gameEngine.current.stop();
                                        }
                                        setRunning(false);
                                        break;
                                    case 'new_point':
                                        if (sfxOn) playPointSound();
                                        setCurrentPoints(currentPoints + 1);
                                        break;
                                    case 'coin_collected':
                                        if (sfxOn) playPointSound();
                                        setCoinCount(coinCount + 1);  
                                        break;
                                    case 'miss':
                                        if (sfxOn) playCollisionSound();
                                        setCurrentPoints(Math.max(currentPoints - 1, 0));
                                        break;
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
                />
                )
            ) : (
                <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 24 }}>
                    Loading...
                </Text>
            )}
        </View>
    );
}
