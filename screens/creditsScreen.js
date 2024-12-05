import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'
import { GameEngine } from 'react-native-game-engine'
import entities from '../entities/creditsentities'
import Physics from '../physics'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'


export default function CreditsScreen({ navigation }) {
  const styles = DarkTheme(isDarkMode)
  const { isDarkMode } = useTheme()
  const gameEngine = useRef(null)
  const stopMusicRef = useRef()
  const [musicOn, setMusicOn] = useState(false)

  const backgroundImage = isDarkMode
    ? require('../assets/Taustakuvatakatumma.jpg')
    : require('../assets/Taustakuvatakavaalea.jpg')
  const backdropImage = require('../assets/Taustakuva2ala.png')

  useFocusEffect(
    React.useCallback(() => {
      const loadSettings = async () => {
        try {
          const savedMusic = await AsyncStorage.getItem('MusicOn')
          const savedClassic = await AsyncStorage.getItem('ClassicOn')

          setMusicOn(savedMusic === 'true')
        } catch (error) {
          console.error('Error loading settings:', error)
        }
      }

      loadSettings()
    }, [])
  )

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
      <View style={styles.optionsBottomContainer}>
        <Text style={styles.title}>RC Pupper Racing team</Text>
        <Text style={styles.text}>
            Hannu Karjalainen{"\n"}Matti Nieminen{"\n"}Tapio Kylmämaa{"\n"}Jimi Jakola
        </Text>
        
            <TouchableOpacity
                style={[styles.button, styles.returnButton]}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonTitle}>RETURN</Text>
            </TouchableOpacity>
        
      </View>
    </ImageBackground>
  )
}