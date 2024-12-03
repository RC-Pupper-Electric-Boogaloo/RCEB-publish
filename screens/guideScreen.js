import React, { useRef } from "react"
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Image } from "react-native"
import { StatusBar } from 'expo-status-bar'
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'
import { GameEngine } from 'react-native-game-engine'
import entities from '../entities/menuentities'
import Physics from '../physics'

const GuideScreen = ({ navigation }) => {
    const { isDarkMode } = useTheme()
    const styles = DarkTheme(isDarkMode)
    const gameEngine = useRef(null)
    const backgroundImage = isDarkMode

        ? require('../assets/Taustakuvatakatumma.jpg')
        : require('../assets/Taustakuvatakavaalea.jpg')
    const backdropImage = require('../assets/Taustakuva8ala.png')
    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
        >
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
                        <Text style={styles.screenHeader}>Guide:</Text>
                    </View>
                    <ScrollView persistentScrollbar={true} contentContainerStyle={styles.scrollViewContent}>
                        <View style={styles.guideSection}>
                            <Image
                                source={require('../assets/CharDog.png')}
                                style={styles.guideImage}
                            />
                            <View style={styles.guideCenter}>
                                <Text style={styles.title}>Playing</Text>
                                <Text style={styles.text}>
                                    Move puppy with your finger
                                </Text>
                            </View>
                        </View>
                        <View style={styles.guideSection}>
                            <Image
                                source={require('../assets/Point.png')}
                                style={styles.guideImage}
                            />
                            <View style={styles.guideCenter}>
                                <Text style={styles.title}>Points</Text>
                                <Text style={styles.text}>
                                    The bone is a point
                                </Text>
                            </View>
                        </View>
                        <View style={styles.guideSection}>
                            <Image
                                source={require('../assets/Coin.png')}
                                style={styles.guideImage}
                            />
                            <View style={styles.guideCenter}>
                                <Text style={styles.title}>Coin</Text>
                                <Text style={styles.text}>
                                    Collect coins and use them in store
                                </Text>
                            </View>
                        </View>
                        <View style={styles.guideSection}>
                            <Image
                                source={require('../assets/Choco.png')}
                                style={styles.guideImage}
                            />
                            <View style={styles.guideCenter}>
                                <Text style={styles.title}>Choco</Text>
                                <Text style={styles.text}>
                                    Chocolate steals one point
                                </Text>
                            </View>
                        </View>
                        <View style={styles.guideSection}>
                            <Image
                                source={require('../assets/Cat.png')}
                                style={styles.guideImage}
                            />
                            <View style={styles.guideCenter}>
                                <Text style={styles.title}>Cat</Text>
                                <Text style={styles.text}>
                                    Cat ends the game if you hit it
                                </Text>
                            </View>
                        </View>
                        <View style={styles.guideSection}>
                            <Image
                                source={require('../assets/Battery.png')}
                                style={styles.guideImage}
                            />
                            <View style={styles.guideCenter}>
                                <Text style={styles.title}>Battery</Text>
                                <Text style={styles.text}>
                                    Collect 7 batteries to fill gauge.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.guideSection}>
                            <Image
                                source={require('../assets/gauge.png')}
                                style={styles.guideImage}
                            />
                            <View style={styles.guideCenter}>
                                <Text style={styles.title}>Bonus gauge</Text>
                                <Text style={styles.text}>
                                    Fill to be able to enter bonus mode
                                </Text>
                            </View>
                        </View>
                        <View style={styles.guideSection}>
                            <Image
                                source={require('../assets/rainbow.png')}
                                style={styles.guideImage}
                            />
                            <View style={styles.guideCenter}>
                                <Text style={styles.title}>Bonus activate</Text>
                                <Text style={styles.text}>
                                    Shake your phone, when the gauge is full
                                </Text>
                            </View>
                        </View>
                        <View style={styles.guideSectionLast}>
                            <Image
                                source={require('../assets/Coin.png')}
                                style={styles.guideImage}
                            />
                            <View style={styles.guideCenter}>
                                <Text style={styles.title}>Bonus coin</Text>
                                <Text style={styles.text}>
                                    Keep collecting to keep them coming
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={styles.returnButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonTitle}>RETURN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default GuideScreen