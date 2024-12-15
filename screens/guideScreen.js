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
                        <Text style={styles.screenHeader}>Guide</Text>
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
                                    Chocolate steals one point and discharges some battery
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
                        <View style={styles.guideSection}>
                            <Image
                                source={require('../assets/Coin.png')}
                                style={styles.guideImage}
                            />
                            <View style={styles.guideCenter}>
                                <Text style={styles.title}>Bonus coin</Text>
                                <Text style={styles.text}>
                                    Cats and Choco turn to coins during bonus mode. Watch out when bonus ends!
                                </Text>
                            </View>
                        </View>
                        <View style={styles.guideSection}>
                            <Image
                                source={require('../assets/Random.png')}
                                style={styles.guideImage}
                            />
                            <View style={styles.guideCenter}>
                                <Text style={styles.title}>Achievements</Text>
                                <Text style={styles.text}>
                                    You can get even more puppies by completing tasks at achievements. Some puppies need you to click achievement after you complete it. After that new pupper can be found at shop.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.guideSection}>
                            <Image
                                source={require('../assets/sign.png')}
                                style={styles.guideImage}
                            />
                            <View style={styles.guideCenter}>
                                <Text style={styles.title}>Puppy Pawn Shop</Text>
                                <Text style={styles.text}>
                                    You can use your hard earned coins here to get new puppers! You can also access Puppypark from shop.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.guideSectionLast}>
                            <Image
                                source={require('../assets/Parksign.png')}
                                style={styles.guideImage}
                            />
                            <View style={styles.guideCenter}>
                                <Text style={styles.title}>Puppypark</Text>
                                <Text style={styles.text}>
                                    Join Puppypark with your pupper. You can pet your pupper by tapping it. Once pupper is super happy it may leave you with a treasure. Give him treats to get even more treasure. Sometimes treats can get lost if pupper is too eager.
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={[styles.returnButton, styles, { marginTop: 16 }]} onPress={() => navigation.navigate('Credits')}>
                        <Text style={styles.buttonTitle}>CREDITS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.returnButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonTitle}>RETURN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default GuideScreen