import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';

const OptionScreen = ({ navigation }) => {
  const [MusicOn, setIsMusicOn] = useState(false);
  const [SfxOn, setIsSfxOn] = useState(false);

  const { isDarkMode, toggleDarkMode, setIsDarkMode } = useTheme();
  const styles = DarkTheme(isDarkMode);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('darkMode');
        const savedMusic = await AsyncStorage.getItem('MusicOn');
        const savedSfx = await AsyncStorage.getItem('SfxOn');

        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'true');
        }

        if (savedMusic !== null) {
          setIsMusicOn(savedMusic === 'true');
        }

        if (savedSfx !== null) {
          setIsSfxOn(savedSfx === 'true');
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };
    loadSettings();
  }, []);

  const toggleMusic = async () => {
    const newMusicOn = !MusicOn;
    setIsMusicOn(newMusicOn);
    try {
      await AsyncStorage.setItem('MusicOn', JSON.stringify(newMusicOn));
    } catch (error) {
      console.error("Error saving MusicOn setting:", error);
    }
  };

  const toggleSfx = async () => {
    const newSfxOn = !SfxOn;
    setIsSfxOn(newSfxOn);
    try {
      await AsyncStorage.setItem('SfxOn', JSON.stringify(newSfxOn));
    } catch (error) {
      console.error("Error saving SfxOn setting:", error);
    }
  };

  const resetData = async () => {
    try {
      await AsyncStorage.removeItem('darkMode');
      await AsyncStorage.removeItem('HIGHSCORES');
      await AsyncStorage.removeItem('MusicOn');
      await AsyncStorage.removeItem('SfxOn');
      setIsDarkMode(false);
      setIsMusicOn(false);
      setIsSfxOn(false);
      alert('Data reset successfully!');
    } catch (error) {
      console.error("Error resetting data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Options</Text>
      <View style={styles.optionsContainer}>
        <View style={styles.Row}>
          <Text style={styles.Label}>Music</Text>
          <TouchableOpacity style={[styles.button, MusicOn && styles.activeButton]} onPress={toggleMusic}>
            <Text style={styles.buttonTitle}>{MusicOn ? "On" : "Off"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Row}>
          <Text style={styles.Label}>SFX</Text>
          <TouchableOpacity style={[styles.button, SfxOn && styles.activeButton]} onPress={toggleSfx}>
            <Text style={styles.buttonTitle}>{SfxOn ? "On" : "Off"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Row}>
          <Text style={styles.Label}>Dark Mode</Text>
          <TouchableOpacity style={styles.button} onPress={toggleDarkMode}>
            <Text style={styles.buttonTitle}>{isDarkMode ? "On" : "Off"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetData}>
        <Text style={styles.buttonTitle}>RESET DATA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.returnButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonTitle}>Return</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OptionScreen;
