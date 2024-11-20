import React from "react"
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'

const GuideScreen = ({navigation}) => {
    const { isDarkMode } = useTheme()
    const styles = DarkTheme(isDarkMode)

    return (
        <ScrollView contentContainerStyle={styles.Guidecontainer}>
            <Text style={styles.Guidetitle}>Guide</Text>

            <View style={styles.Guidesection}>
                <Image
                    source={require('../assets/Point.png')}
                    style={styles.Guideimage}
                />
                <View style={styles.GuideCenter}>
                    <Text style={styles.sectionTitle}>Points</Text>
                    <Text style={styles.Guidetext}>
                    The bone is point
                    </Text>
                </View>
            </View>

            <View style={styles.Guidesection}>
                <Image
                    source={require('../assets/Coin.png')}
                    style={styles.Guideimage}
                />
                <View style={styles.GuideCenter}>
                    <Text style={styles.sectionTitle}>Coin</Text>
                    <Text style={styles.Guidetext}>
                    Collect coins and use them in store
                    </Text>
                </View>
            </View>

            <View style={styles.Guidesection}>
                <Image
                    source={require('../assets/Choco.png')}
                    style={styles.Guideimage}
                />
                <View style={styles.GuideCenter}>
                    <Text style={styles.sectionTitle}>Choco</Text>
                    <Text style={styles.Guidetext}>
                    Chocolate steals one point
                    </Text>
                </View>
            </View>

            <View style={styles.Guidesection}>
                <Image
                    source={require('../assets/Cat.png')}
                    style={styles.Guideimage}
                    />
                <View style={styles.GuideCenter}>
                    <Text style={styles.sectionTitle}>Cat</Text>
                    <Text style={styles.Guidetext}>
                    Cat ends the game if you hit it
                    </Text>
                </View>
            </View>
            <View style={styles.containerMainMenu}>
            <TouchableOpacity style={[styles.button, styles.returnButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonTitle}>Return</Text>
      </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default GuideScreen;
