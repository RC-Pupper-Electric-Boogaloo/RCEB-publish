import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import entities from '../entities';
import Physics from '../physics';
import BackgroundMusic, { usePlayCollisionSound, usePlayPointSound } from '../components/BackgroundMusic';
import GameOverScreen from './gameOverScreen'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GameScreen({ navigation }) {
    const [running, setRunning] = useState(true); 
    const [currentPoints, setCurrentPoints] = useState(0);
    const [coinCount, setCoinCount] = useState(0);
    const playCollisionSound = usePlayCollisionSound();
    const playPointSound = usePlayPointSound();
    const stopMusicRef = useRef();
    const [sfxOn, setSfxOn] = useState(false);
    const [musicOn, setMusicOn] = useState(false);
    const gameEngine = useRef(null);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedSfx = await AsyncStorage.getItem('SfxOn');
                const parsedSfx = savedSfx === 'true';
                setSfxOn(parsedSfx);

                const savedMusic = await AsyncStorage.getItem('MusicOn');
                const parsedMusic = savedMusic === 'true';
                setMusicOn(parsedMusic);
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };

        loadSettings();
    }, []);

    const handleRestart = () => {
        setCurrentPoints(0);
        setCoinCount(0);  
        setRunning(true);

        if (gameEngine.current) {
            gameEngine.current.swap(entities());  
            gameEngine.current.start();  
        }
    };

    const handleShowHighscores = () => {
        navigation.navigate('Highscore');
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#b4b4b4' }}>
            {running ? (
                <>
                    <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20, zIndex: 100, position: 'absolute', right: 20 }}>
                        {currentPoints}
                    </Text>

                    {musicOn && <BackgroundMusic stopRef={stopMusicRef} />}
                    <GameEngine
                        ref={gameEngine}
                        systems={[Physics]}
                        entities={entities()}
                        running={running}
                        onEvent={(e) => {
                            switch (e.type) {
                                case 'game_over':
                                    if (sfxOn) playCollisionSound();
                                    if (stopMusicRef.current) stopMusicRef.current(); 
                                    setRunning(false);
                                    gameEngine.current.stop(); 
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
                                    setCurrentPoints(Math.max(currentPoints - 5, 0));
                                    break;
                            }
                        }}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                        <StatusBar style="auto" hidden={true} />
                    </GameEngine>
                </>
            ) : (
                <GameOverScreen
                    onRestart={handleRestart}
                    onShowHighscores={handleShowHighscores}
                />
            )}
        </View>
    );
}
