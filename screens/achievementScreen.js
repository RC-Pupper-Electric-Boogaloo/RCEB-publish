import React, { useState, useEffect, useRef } from "react"
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Image, Alert } from "react-native"
import { StatusBar } from 'expo-status-bar'
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'
import { GameEngine } from 'react-native-game-engine'
import AsyncStorage from '@react-native-async-storage/async-storage'
import entities from '../entities/menuentities'
import Physics from '../physics'
import ProgressBar from 'react-native-progress/Bar'

const AchievementScreen = ({ navigation }) => {
    const { isDarkMode } = useTheme()
    const styles = DarkTheme(isDarkMode)
    const gameEngine = useRef(null)
    const [achievements, setAchievements] = useState([])
    const [stats, setStats] = useState({ totalPoints: 0, totalCoins: 0, gamesPlayed: 0, totalPlayTime: 0 })
    const [highScore, setHighScore] = useState(0)

    const backdropImage = require('../assets/Taustakuva9ala.png')
    const backgroundImage = isDarkMode
        ? require('../assets/Taustakuvatakatumma.jpg')
        : require('../assets/Taustakuvatakavaalea.jpg')

    const achievementList = [
        { id: 1, name: "Golden Retriever", requirement: "Collect 10,000 gold coins", image: require('../assets/rcGentlePuppy.png'), progress: 0, goal: 10000 },
        { id: 2, name: "Eternity in Dog Years", requirement: "Play 5 hours", image: require('../assets/rcTimeKeeper.png'), progress: 0, goal: 5 },
        { id: 3, name: "Boneyard", requirement: "Collect 10,000 points", image: require('../assets/rcPiratePup.png'), progress: 0, goal: 10000 },
        { id: 4, name: "Bonus Pupper!", requirement: "Get 10 puppies", image: require('../assets/rcBonusPuppy.png'), progress: 0, goal: 10 },
        { id: 5, name: "Hide and Seek!", requirement: "Find hidden puppy", image: require('../assets/rcSgtWoofer.png'), progress: 0, goal: 1 },
        { id: 6, name: "Puppies Sold Out!", requirement: "Buy all puppies", image: require('../assets/rcMeclarBeagle.png'), progress: 0, goal: 7 },
        { id: 7, name: "Howling Success!", requirement: "Score 100 points in one game", image: require('../assets/rcPupperOg.png'), progress: 0, goal: 100 },
        { id: 8, name: "Everypuppy is here!", requirement: "Adopt all 15 puppies", image: require('../assets/Random.png'), progress: 0, goal: 15 },
    ]

    useEffect(() => {
        const loadStatsAndScores = async () => {
            try {
                const savedStats = await AsyncStorage.getItem('GAME_STATS')
                const parsedStats = savedStats ? JSON.parse(savedStats) : { totalPoints: 0, totalCoins: 0, gamesPlayed: 0, totalPlayTime: 0 }
                setStats(parsedStats)

                const savedScores = await AsyncStorage.getItem('HIGHSCORES')
                let scoresArray = savedScores ? JSON.parse(savedScores) : []
                const highestScore = scoresArray.length > 0 ? Math.max(...scoresArray) : 0
                setHighScore(highestScore)

                const savedSkins = await AsyncStorage.getItem('purchasedSkins')
                updateAchievements(parsedStats, highestScore, savedSkins)
            } catch (error) {
                console.error("Error loading stats or high scores:", error)
            }
        }

        loadStatsAndScores()
    }, [])

    const updateAchievements = (stats, highestScore, savedSkins) => {
        const skinCount = savedSkins ? JSON.parse(savedSkins).length : 0
        const wooferSkinIndex = 12;
        const purchasedSkins = savedSkins ? JSON.parse(savedSkins) : []
        const requiredSkins = [1, 2, 3, 4, 5, 6, 7] // Skinindexit, jotka pitää olla hankittu

        const updatedAchievements = achievementList.map(achievement => {
            let progress = 0

            switch (achievement.id) {
                case 1: progress = stats.totalCoins; break
                case 2: progress = Math.floor(stats.totalPlayTime / 3600); break
                case 3: progress = stats.totalPoints; break
                case 4: progress = skinCount; break
                case 5:
                    progress = purchasedSkins.includes(wooferSkinIndex) ? 1 : 0
                    break
                case 6:
                    progress = requiredSkins.filter(skin => purchasedSkins.includes(skin)).length // Lasketaan, kuinka monta skiniä on hankittu
                    break
                case 7: progress = highestScore; break
                case 8: progress = skinCount; break
                default: break
            }

            return { ...achievement, progress, unlocked: progress >= achievement.goal }
        })

        setAchievements(updatedAchievements)
    }

    const unlockSkin = async (skinIndex, customMessage) => {
        try {
            const currentSkins = await AsyncStorage.getItem('purchasedSkins')
            const purchasedSkins = currentSkins ? JSON.parse(currentSkins) : []
            if (!purchasedSkins.includes(skinIndex)) {
                purchasedSkins.push(skinIndex)
                await AsyncStorage.setItem('purchasedSkins', JSON.stringify(purchasedSkins))
            }

            Alert.alert("Achievement Unlocked", customMessage)
        } catch (error) {
            console.error("Error unlocking skin:", error)
        }
    }

    const handleAchievementClick = (achievement) => {
        if (!achievement.unlocked) {
            Alert.alert("Achievement Locked", `${achievement.requirement}`)
            return
        }

        const reward = rewards[achievement.id]
        if (reward) unlockSkin(reward.skinIndex, reward.message)
    }

    const rewards = {
        1: {
            skinIndex: 8,
            name: "Golden Puppy",
            message: "You unlocked 'Golden Retriever'! Golden Puppy is now available in the shop."
        },
        2: {
            skinIndex: 9,
            name: "Timekeeper Dachshund",
            message: "You unlocked 'Eternity in Dog Years'! Timekeeper Dachshund is now available in the shop."
        },
        3: {
            skinIndex: 10,
            name: "Pirate Corgi",
            message: "You unlocked 'Boneyard'! Pirate Corgi is now available in the shop."
        },
        4: {
            skinIndex: 11,
            name: "Bonus Pupper",
            message: "You unlocked 'Bonus Pupper!' Bonus Pupper is now available in the shop."
        },
        5: {
            skinIndex: 12,
            name: "Sergeant Woofer",
            message: "You unlocked 'Hide and Seek!' Sergeant Woofer is now available in the shop."
        },
        6: {
            skinIndex: 13,
            name: "Merchant Beagle",
            message: "You unlocked 'Puppies Sold Out!' Merchant Beagle is now available in the shop."
        },
        7: {
            skinIndex: 14,
            name: "OG RC Pupper",
            message: "You unlocked 'Howling Success!' OG RC Pupper is now available in the shop. You can also toggle Classic mode from options"
        },
        8: {
            skinIndex: 15,
            name: "Random Puppy",
            message: "You unlocked 'Everypuppy is here!' You can now randomise your puppy when entering game. Choose random from shop."
        },
    }

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <GameEngine
                ref={gameEngine}
                systems={[Physics]}
                entities={entities(null, backdropImage)}
                running={true}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            >
                <StatusBar style="auto" hidden={true} />
            </GameEngine>

            <View style={styles.container}>
                <View style={styles.colorContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.screenHeader}>Achievements:</Text>
                    </View>
                    <ScrollView persistentScrollbar={true} contentContainerStyle={styles.scrollViewContent}>
                        {achievements.map((achievement) => (
                            <TouchableOpacity
                                key={achievement.id}
                                style={styles.guideSection}
                                onPress={() => handleAchievementClick(achievement)}
                                activeOpacity={achievement.unlocked ? 0.7 : 1}
                            >
                                <Image source={achievement.image} style={[styles.guideImage, { tintColor: achievement.unlocked ? 'none' : 'gray' }]} />
                                <View style={styles.guideCenter}>
                                    <Text style={styles.title}>{achievement.name}</Text>
                                    <Text style={styles.text}>{achievement.requirement}</Text>
                                    <ProgressBar
                                        progress={achievement.progress / achievement.goal}
                                        width={200}
                                        color={achievement.unlocked ? "green" : "gray"}
                                        style={{ marginVertical: 5 }}
                                    />
                                    <Text style={styles.text}>
                                        {achievement.unlocked ? "Unlocked!" : `Progress: ${achievement.progress}/${achievement.goal}`}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.returnButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonTitle}>RETURN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default AchievementScreen;
