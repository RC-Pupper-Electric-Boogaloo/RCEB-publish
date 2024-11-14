import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import entities from '../entities';
import Physics from '../physics';
import BackgroundMusic, { usePlayCollisionSound, usePlayPointSound } from '../components/BackgroundMusic';
import HighscoreScreen from './highscoreScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GameScreen({ navigation }) {
    const [running, setRunning] = useState(false);
    const [gameEngine, setGameEngine] = useState(null);
    const [currentPoints, setCurrentPoints] = useState(0);
    const [coinCount, setCoinCount] = useState(0);
    const playCollisionSound = usePlayCollisionSound();
    const playPointSound = usePlayPointSound();
    const [showHighscores, setShowHighscores] = useState(false);
    const stopMusicRef = useRef(); 
    const [sfxOn, setSfxOn] = useState(false);
    const [musicOn, setMusicOn] = useState(false); 

    useEffect(() => {
        setRunning(false);

        // Lataa SFX-asetus AsyncStorage:sta
        const loadSetting = async () => {
            try {
                const savedSfx = await AsyncStorage.getItem('SfxOn');
                const parsedSfx = savedSfx === 'true';
                setSfxOn(parsedSfx);
                console.log('SfxOn loaded:', parsedSfx);
    
                const savedMusic = await AsyncStorage.getItem('MusicOn');
                const parsedMusic = savedMusic === 'true';
                setMusicOn(parsedMusic);
                console.log('MusicOn loaded:', parsedMusic);
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };

        loadSetting();
    }, []);

    const handleShowHighScores = () => {
        setShowHighscores(true);
    };

    const updateCoinCount = async () => {
        try {
            const storedCoinCount = await AsyncStorage.getItem('coinCount');
            const parsedStoredCoinCount = storedCoinCount ? JSON.parse(storedCoinCount) : 0;
    
            const updatedCoinCount = parsedStoredCoinCount + coinCount;
    
            await AsyncStorage.setItem('coinCount', JSON.stringify(updatedCoinCount));
        } catch (error) {
            console.error('Error updating coin count:', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#b4b4b4' }}>
            {showHighscores ? (
                <HighscoreScreen points={currentPoints} onReturn={() => setShowHighscores(false)} />
            ) : (
                <>
                    <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20, zIndex: 100, position: 'absolute', right: 20 }}>
                        {currentPoints}
                    </Text>

                    {musicOn && <BackgroundMusic stopRef={stopMusicRef} />}
                    <GameEngine
                        ref={(ref) => { setGameEngine(ref); }}
                        systems={[Physics]}
                        entities={entities()}
                        running={running}
                        onEvent={(e) => {
                            switch (e.type) {
                                case 'game_over':
                                    if (sfxOn) {
                                        playCollisionSound();
                                    }
                                    if (stopMusicRef.current) {
                                        stopMusicRef.current(); // Pysäytä musiikki
                                    }
                                    setRunning(false);
                                    gameEngine.stop();
                                    updateCoinCount();
                                    handleShowHighScores();
                                    break;
                                case 'new_point':
                                    if (sfxOn) {
                                    playPointSound();
                                    }
                                    setCurrentPoints(currentPoints + 1);
                                    break;
                                case 'coin_collected':
                                    if (sfxOn) {
                                    playPointSound();
                                    }
                                    setCoinCount(coinCount + 1);
                                    break;
                                case 'miss':
                                    if (sfxOn) {
                                    playCollisionSound();
                                    }
                                    if (currentPoints >= 5) {
                                        setCurrentPoints(currentPoints - 5);
                                    } else {
                                        setCurrentPoints(0);
                                    }
                                    break;
                            }
                        }}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                        <StatusBar style="auto" hidden={true} />
                    </GameEngine>

                    {!running ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
                                onPress={() => {
                                    setCurrentPoints(0);
                                    setRunning(true);
                                    gameEngine.swap(entities());
                                    gameEngine.start();
                                }}
                            >
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
                                    START GAME
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </>
            )}
        </View>
    );
}
