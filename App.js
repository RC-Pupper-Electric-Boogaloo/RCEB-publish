import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StartScreen from './screens/startScreen'
import MainMenuScreen from './screens/mainMenuScreen'
import GameScreen from './screens/gameScreen'
import HighscoreScreen from './screens/highscoreScreen'

const Stack = createNativeStackNavigator()

export default function App() {

    return (
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
                    name='Highscore'
                    component={HighscoreScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}