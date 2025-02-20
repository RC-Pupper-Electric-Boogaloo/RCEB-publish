import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ThemeProvider } from './components/Theme'
import { MusicProvider } from './contexts/MusicContext'
import StartScreen from './screens/startScreen'
import MainMenuScreen from './screens/mainMenuScreen'
import GameScreen from './screens/gameScreen'
import PuppyparkScreen from './screens/puppyparkScreen'
import GameScreenClassic from './screens/gameScreenClassic'
import GameOverScreen from './screens/gameOverScreen'
import HighscoreScreen from './screens/highscoreScreen'
import OptionScreen from './screens/optionScreen'
import ShopScreen from './screens/shopScreen'
import StatsScreen from './screens/StatsScreen'
import GuideScreen from './screens/guideScreen'
import AchievementScreen from './screens/achievementScreen'
import CreditsScreen from './screens/creditsScreen'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <ThemeProvider>
            <MusicProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='Start'>
                        <Stack.Screen
                            name='Start'
                            component={StartScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='MainMenu'
                            component={MainMenuScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Game'
                            component={GameScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='GameClassic'
                            component={GameScreenClassic}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='GameOver'
                            component={GameOverScreen} 
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Highscore'
                            component={HighscoreScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Options'
                            component={OptionScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Shop'
                            component={ShopScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Stats'
                            component={StatsScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Guide'
                            component={GuideScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Achievement'
                            component={AchievementScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Credits'
                            component={CreditsScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Puppypark'
                            component={PuppyparkScreen}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </MusicProvider>
        </ThemeProvider>
    )
}