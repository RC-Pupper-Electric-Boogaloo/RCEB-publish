import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import entities from '../entities';
import Physics from '../physics';
import BackgroundMusic, { usePlayCollisionSound, usePlayPointSound } from '../components/BackgroundMusic';
import HighscoreScreen from '../screens/highscoreScreen';

const GameScreen = () => {
    const [running, setRunning] = useState(false);
    const [gameEngine, setGameEngine] = useState(null);
    const [currentPoints, setCurrentPoints] = useState(0);
    const [coinCount, setCoinCount] = useState(0); 
    const playCollisionSound = usePlayCollisionSound();
    const playPointSound = usePlayPointSound();
    const [showHighscores, setShowHighscores] = useState(false);
    const stopMusicRef = useRef(); // Tämä on tärkeää, jotta stopRef on alustettu

    useEffect(() => {
        setRunning(false);
    }, []);

    const handleShowHighScores = () => {
        setShowHighscores(true);
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

                    <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20, zIndex: 100, position: 'absolute', right: 20, top: 70 }}>
                        Kolikot: {coinCount}
                    </Text>

                    <BackgroundMusic stopRef={stopMusicRef} />
                    <GameEngine
                        ref={(ref) => { setGameEngine(ref); }}
                        systems={[Physics]}
                        entities={entities()}
                        running={running}
                        onEvent={(e) => {
                            switch (e.type) {
                                case 'game_over':
                                    playCollisionSound();
                                    if (stopMusicRef.current) {
                                        stopMusicRef.current(); // Pysäytä musiikki
                                    }
                                    setRunning(false);
                                    gameEngine.stop();
                                    handleShowHighScores();
                                    break;
                                case 'new_point':
                                    playPointSound();
                                    setCurrentPoints(currentPoints + 1);
                                    break;
                                case 'coin_collected':
                                    // Päivitä kolikkolaskuri
                                    setCoinCount(coinCount + 1);
                                    break;
                                case 'miss':
                                    playCollisionSound();
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
                                    setCoinCount(0); // Nollaa kolikkolaskuri pelin alussa
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
};

export default GameScreen;
