import React, { useState, useEffect, useRef } from "react"
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Image, Alert } from "react-native"
import { StatusBar } from 'expo-status-bar'
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'
import { GameEngine } from 'react-native-game-engine'
import entities from '../entities/menuentities'
import Physics from '../physics'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AchievementScreen = ({ navigation }) => {
    const { isDarkMode } = useTheme()
    const styles = DarkTheme(isDarkMode)
    const gameEngine = useRef(null)
    const [achievements, setAchievements] = useState([])

    const backgroundImage = isDarkMode
        ? require('../assets/Taustakuvatakatumma.jpg')
        : require('../assets/Taustakuvatakavaalea.jpg')

    const backdropImage = require('../assets/Taustakuva8ala.png')

    const defaultAchievements = [
        { id: 1, name: "Golden Retriever", requirement: "collect 10.000 gold coins", image: require('../assets/CharDog.png'), progress: 0, goal: 10000, unlocked: false },
        { id: 2, name: "Eternity in Dog Years", requirement: "Play 200 hours", image: require('../assets/Point.png'), progress: 0, goal: 200, unlocked: false },
        { id: 3, name: "Boneyard", requirement: "Collect 10,000 bones", image: require('../assets/Coin.png'), progress: 0, goal: 10000, unlocked: false },
        { id: 4, name: "Howling Success!", requirement: "Collect over 100 points in single game", image: require('../assets/Cat.png'), progress: 0, goal: 100, unlocked: false },
    ];

    useEffect(() => {
        const loadAchievements = async () => {
            try {
                const storedAchievements = await AsyncStorage.getItem('achievements')
                if (storedAchievements) {
                    setAchievements(JSON.parse(storedAchievements))
                } else {
                    setAchievements(defaultAchievements)
                }
            } catch (error) {
                console.error("Error loading achievements:", error)
                setAchievements(defaultAchievements)
            }
        };

        loadAchievements()
    }, []);

    useEffect(() => {
        const saveAchievements = async () => {
            try {
                await AsyncStorage.setItem('achievements', JSON.stringify(achievements))
            } catch (error) {
                console.error("Error saving achievements:", error)
            }
        };

        saveAchievements()
    }, [achievements])

    const handleAchievementClick = (achievement) => {
        if (!achievement.unlocked) {
            Alert.alert(
                "Achievement Locked",
                `Achievement "${achievement.name}" is locked. ${achievement.requirement}`
            );
        } else {
            Alert.alert("Achievement Unlocked", `GZ you unlocked anchievement! "${achievement.name}".`)
        }
    };

    const incrementProgress = (achievementId, increment) => {
        setAchievements((prevAchievements) =>
            prevAchievements.map((achievement) => {
                if (achievement.id === achievementId && !achievement.unlocked) {
                    const newProgress = achievement.progress + increment
                    return {
                        ...achievement,
                        progress: newProgress,
                        unlocked: newProgress >= achievement.goal,
                    };
                }
                return achievement
            })
        );
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.Hbackground}>
            <GameEngine
                ref={gameEngine}
                systems={[Physics]}
                entities={entities(null, backdropImage)}
                running={true}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            >
                <StatusBar style="auto" hidden={true} />
            </GameEngine>

            <ScrollView contentContainerStyle={styles.Guidecontainer}>
                <Text style={styles.Guidetitle}>Achievements</Text>

                {achievements.map((achievement) => (
                    <TouchableOpacity
                        key={achievement.id}
                        style={styles.Guidesection}
                        onPress={() => handleAchievementClick(achievement)}
                        activeOpacity={achievement.unlocked ? 0.7 : 1}
                    >
                        <Image
                            source={achievement.image}
                            style={[
                                styles.Guideimage,
                                {
                                    opacity: achievement.unlocked ? 1 : 0.01,
                                }
                            ]}
                        />
                        <View style={styles.GuideCenter}>
                            <Text style={styles.sectionTitle}>{achievement.name}</Text>
                            <Text style={styles.Guidetext}>
                                {achievement.requirement}
                            </Text>
                            <Text style={styles.Guidetext}>
                                {achievement.unlocked
                                    ? "Unlocked!"
                                    : `Progress: ${achievement.progress}/${achievement.goal}`}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    style={[styles.button, styles.GuidereturnButton]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonTitle}>Return</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
};

export default AchievementScreen;