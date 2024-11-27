import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'
import { MusicContext } from '../contexts/MusicContext.js'
import { GameEngine } from 'react-native-game-engine'
import entities from '../entities/menuentities'
import Physics from '../physics'

const OptionScreen = ({ navigation }) => {
  const { musicOn, toggleMusic, setMusic } = useContext(MusicContext)
  const [SfxOn, setIsSfxOn] = useState(false)
  const [ShowClassic, setShowClassic] = useState(false)
  const [ClassicOn, setClassicOn] = useState(false)
  const { isDarkMode, toggleDarkMode, setIsDarkMode } = useTheme()
  const styles = DarkTheme(isDarkMode)
  const gameEngine = useRef(null)

  const backgroundImage = isDarkMode
  ? require('../assets/Taustakuvatakatumma.jpg')
  : require('../assets/Taustakuvatakavaalea.jpg')
  const backdropImage = require('../assets/Taustakuva5ala.png')

  useEffect(() => {
    setMusic(require('../assets/bgmenu.mp3'))
  }, [setMusic])

  const ResetData = () => {
    Alert.alert(
      "Are you sure?",
      "Do you really want to reset all data?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Yes",
          onPress: () => resetData()
        }
      ]
    )
  }

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('darkMode')
        const savedSfx = await AsyncStorage.getItem('SfxOn')
        const savedClassic = await AsyncStorage.getItem('ClassicOn')
        const mySkins = await AsyncStorage.getItem('purchasedSkins')
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'true')
        }

        if (savedSfx !== null) {
          setIsSfxOn(savedSfx === 'true')
        }
        if (savedClassic !== null) {
          setClassicOn(savedClassic === 'true')
        }
        if (mySkins) {
          const parsedSkins = JSON.parse(mySkins)
          if (Array.isArray(parsedSkins) && parsedSkins.includes(11)) {
            setShowClassic(true)
          }
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      }
    }
    loadSettings()
  }, [])

  const toggleSfx = async () => {
    const newSfxOn = !SfxOn
    setIsSfxOn(newSfxOn)
    try {
      await AsyncStorage.setItem('SfxOn', JSON.stringify(newSfxOn))
    } catch (error) {
      console.error("Error saving SfxOn setting:", error)
    }
  }

  const toggleClassic = async () => {
    const newClassicOn = !ClassicOn
    setClassicOn(newClassicOn)
    try {
      await AsyncStorage.setItem('ClassicOn', JSON.stringify(newClassicOn))
    } catch (error) {
      console.error("Error saving Classic Mode setting:", error)
    }
  }

  const resetData = async () => {
    try {
      await AsyncStorage.removeItem('darkMode')
      await AsyncStorage.removeItem('HIGHSCORES')
      await AsyncStorage.removeItem('MusicOn')
      await AsyncStorage.removeItem('SfxOn')
      await AsyncStorage.removeItem('purchasedSkins')
      await AsyncStorage.removeItem('GAME_STATS')
      await AsyncStorage.removeItem('coinCount')
      await AsyncStorage.removeItem('ClassicOn')
      await AsyncStorage.setItem('activeSkin', JSON.stringify(0))
      setIsDarkMode(false)
      setIsSfxOn(false)
      toggleMusic(false)
      setClassicOn(false)
      setShowClassic(false)
      Alert.alert('Data reset successfully!', 'Good Luck & Have Fun!')
    } catch (error) {
      console.error("Error resetting data:", error)
    }
  }

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
    <View style={styles.containerMainMenu}>
      <Text style={styles.title}>Options</Text>
      <View style={styles.optionsContainer}>
        <View style={styles.Row}>
          <Text style={styles.Label}>Music</Text>
          <TouchableOpacity style={[styles.button, musicOn && styles.activeButton]} onPress={toggleMusic}>
            <Text style={styles.buttonTitle}>{musicOn ? "On" : "Off"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Row}>
          <Text style={styles.Label}>SFX</Text>
          <TouchableOpacity style={[styles.button, SfxOn && styles.activeButton]} onPress={toggleSfx}>
            <Text style={styles.buttonTitle}>{SfxOn ? "On" : "Off"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Row}>
          <Text style={styles.Label}>DarkMode</Text>
          <TouchableOpacity style={[styles.button, isDarkMode && styles.activeButton]} onPress={toggleDarkMode}>
            <Text style={styles.buttonTitle}>{isDarkMode ? "On" : "Off"}</Text>
          </TouchableOpacity>
          </View>
          {ShowClassic && (
            <View style={styles.Row}>
              <Text style={styles.Label}>ClassicMode</Text>
              <TouchableOpacity style={[styles.button, ClassicOn && styles.activeButton]} onPress={toggleClassic}>
                <Text style={styles.buttonTitle}>{ClassicOn ? "On" : "Off"}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

      <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={ResetData}>
        <Text style={styles.buttonTitle}>RESET DATA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.returnButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonTitle}>Return</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  )
}

export default OptionScreen