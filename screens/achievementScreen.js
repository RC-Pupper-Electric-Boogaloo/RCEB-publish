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
    const [daysPlayed, setDatesPlayed] = useState(0)

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
        { id: 7, name: "Power Trip!", requirement: "Play 50 games", image: require('../assets/rcPowerPuppy.png'), progress: 0, goal: 50 },
        { id: 8, name: "Fast and furryous!", requirement: "Score 100 points in one game", image: require('../assets/rcWinWhippet.png'), progress: 0, goal: 100 },
        { id: 9, name: "My Precious", requirement: "Collect 50,000 total from points and coins", image: require('../assets/rcFluffers.png'), progress: 0, goal: 50000 },
        { id: 10, name: "Test Drive!", requirement: "Play during 14 different days", image: require('../assets/rcCrashBuldog.png'), progress: 0, goal: 14 },
        { id: 11, name: "Choco-Lot of Trouble", requirement: "Get hit by 5,000 Choco. Hurts tummy. Don't give Choco to dogs!", image: require('../assets/rcLePapillon.png'), progress: 0, goal: 5000 },
        { id: 12, name: "Paw-ty Crasher!", requirement: "Find hidden puppy. Rumour says it sometimes visits credits.", image: require('../assets/rcCheemsShiba.png'), progress: 0, goal: 1 },
        { id: 13, name: "Howling Success!", requirement: "Score 250 points in one game", image: require('../assets/rcPupperOg.png'), progress: 0, goal: 250 },
        { id: 14, name: "Everypuppy is here!", requirement: "Adopt atleast 20 puppies", image: require('../assets/Random.png'), progress: 0, goal: 20 },
    ]

    useEffect(() => {
        const loadStatsAndScores = async () => {
            try {
                const savedStats = await AsyncStorage.getItem('GAME_STATS')
                const parsedStats = savedStats ? JSON.parse(savedStats) : { totalPoints: 0, totalCoins: 0, gamesPlayed: 0, totalPlayTime: 0 }
                setStats(parsedStats)
    
                const savedScores = await AsyncStorage.getItem('HIGHSCORES')
                let scoresArray = savedScores ? JSON.parse(savedScores) : []
                const highestScore = scoresArray.length > 0 ? Math.max(...scoresArray.map(score => score.points)) : 0
                setHighScore(highestScore)
    
                const savedSkins = await AsyncStorage.getItem('purchasedSkins')
                // Ladataan päivämäärät
                const storedDates = await AsyncStorage.getItem('DaysPlayed')
                let daysPlayed = 0
                if (storedDates) {
                    const parsedDates = JSON.parse(storedDates)
                    daysPlayed = parsedDates ? parsedDates.length : 0
                }
                console.log(`Days played so far: ${daysPlayed}`)
                setDatesPlayed(daysPlayed); // Asetetaan päivitetty arvo

                // Kutsutaan updateAchievements vasta, kun kaikki tiedot on ladattu ja setState suoritettu
                updateAchievements(parsedStats, highestScore, savedSkins, daysPlayed)

            } catch (error) {
                console.error("Error loading stats or high scores:", error)
            }
        };
    
        loadStatsAndScores()
    }, []);
    
    
    const updateAchievements = (stats, highestScore, savedSkins, daysPlayed) => {
        console.log("Updating achievements, daysPlayed:", daysPlayed); // Debuggaa päivitetty arvo
   
        const skinCount = savedSkins ? JSON.parse(savedSkins).length : 0
        const wooferSkinIndex = 13
        const cheemsSkinIndex = 20
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
                case 7: progress = stats.gamesPlayed; break
                case 8: progress = highestScore; break
                case 9: progress = stats.totalPoints+stats.totalCoins; break
                case 10: progress = daysPlayed; break
                case 11: progress = stats.totalChoco; break
                case 12:
                    progress = purchasedSkins.includes(cheemsSkinIndex) ? 1 : 0
                    break
                case 13: progress = highestScore; break
                case 14: progress = skinCount; break
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
            skinIndex: 9,
            name: "Golden Puppy",
            message: "You unlocked 'Golden Retriever'! Golden Puppy is now available in the shop."
        },
        2: {
            skinIndex: 10,
            name: "Timekeeper Dachshund",
            message: "You unlocked 'Eternity in Dog Years'! Timekeeper Dachshund is now available in the shop."
        },
        3: {
            skinIndex: 11,
            name: "Pirate Corgi",
            message: "You unlocked 'Boneyard'! Pirate Corgi is now available in the shop."
        },
        4: {
            skinIndex: 12,
            name: "Bonus Pupper",
            message: "You unlocked 'Bonus Pupper!' Bonus Pupper is now available in the shop."
        },
        5: {
            skinIndex: 13,
            name: "Sergeant Woofer",
            message: "You unlocked 'Hide and Seek!' Sergeant Woofer is now available in the shop."
        },
        6: {
            skinIndex: 14,
            name: "Merchant Beagle",
            message: "You unlocked 'Puppies Sold Out!' Merchant Beagle is now available in the shop. There is now also one additional puppy for sale!"
        },
        7: {
            skinIndex: 15,
            name: "Power Puppy Pampai",
            message: "You unlocked 'Power Trip!' Power Puppy Pampai is now available in the shop."
        },
        8: {
            skinIndex: 16,
            name: "Win Whippet",
            message: "You unlocked 'Fast and furryous!' Win Whippet is now available in the shop. You can also toggle fast start from options"
        },
        9: {
            skinIndex: 17,
            name: "Fluffers",
            message: "You unlocked 'My Precious' Fluffers is now available in the shop."
        },
        10: {
            skinIndex: 18,
            name: "Crash Buldog",
            message: "You unlocked 'Test Drive!' Crash Buldog is now available in the shop. Thank you for your persistence."
        },
        11: {
            skinIndex: 19,
            name: "Le Papillon",
            message: "You unlocked 'Choco-Lot of Trouble' Le Papillon is now available in the shop. DO NOT GIVE CHOCO TO PUPPIES."
        },
        12: {
            skinIndex: 20,
            name: "Cheems the Shiba",
            message: "You unlocked 'Paw-ty Crasher!' Cheems the Shiba is now available in the shop."
        },
        13: {
            skinIndex: 21,
            name: "OG RC Pupper",
            message: "You unlocked 'Howling Success!' OG RC Pupper is now available in the shop. You can also toggle Classic mode from options."
        },
        14: {
            skinIndex: 22,
            name: "Random Puppy",
            message: "You unlocked 'Everypuppy is here!', Maybe not every Every puppy, but quite many. You can now randomise your puppy when entering game. Choose random from shop."
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
                        <Text style={styles.screenHeader}>Achievements</Text>
                    </View>
                    <ScrollView persistentScrollbar={true} contentContainerStyle={styles.scrollViewContent}>
                        {achievements.map((achievement, index) => (
                            <TouchableOpacity
                                key={achievement.id}
                                style={[
                                    styles.guideSection,
                                    index === achievements.length - 1 && styles.guideSectionLast
                                ]}
                                onPress={() => handleAchievementClick(achievement)}
                                activeOpacity={achievement.unlocked ? 0.7 : 1}
                            >
                                <Image source={achievement.image} style={[styles.guideImage, { tintColor: achievement.unlocked ? 'none' : 'gray' }]} />
                                <View style={styles.guideCenter}>
                                    <Text style={styles.title}>{achievement.name}</Text>
                                    <Text style={styles.text}>{achievement.requirement}</Text>
                                    <ProgressBar
                                        progress={achievement.progress / achievement.goal}
                                        width={150}
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
                    <TouchableOpacity style={[styles.returnButton, styles, { marginTop: 16 }]} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonTitle}>RETURN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default AchievementScreen;
