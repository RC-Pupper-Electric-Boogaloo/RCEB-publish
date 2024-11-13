import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';


const OptionScreen = ({onReturn}) => {

  const [MusicOn, setIsMusicOn] = useState(false);
  const [SfxOn, setIsSfxOn] = useState(false);

  const Music = () => setIsMusicOn(!MusicOn);
  const Sfx = () => setIsSfxOn(!SfxOn);

  const { isDarkMode, toggleDarkMode, setIsDarkMode } = useTheme();
  const styles = DarkTheme(isDarkMode);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('darkMode');
  
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'true');
        } else {
          setIsDarkMode(false);
        }
      } catch (error) {
        console.error("Error loading dark mode:", error);
      }
    };
    loadTheme();
  }, []);

  const resetData = async () => {
    try {
      await AsyncStorage.removeItem('darkMode');
      await AsyncStorage.removeItem('HIGHSCORES');
      setIsDarkMode(false);
      setIsMusicOn(false); 
      setIsSfxOn(false); 
      alert('Data reset successfully!');
    } catch (error) {
      console.error("Error resetting data:", error);
    }
  };

// ON/OFF NAPPEIHIN VAIN LISÄTTY VÄRIN MUUNNOS!!! EI MUUTEN TOIMINNALLISUUTTA, RESET DATA JA RETURN EI TEHE MITÄÄN
// POISTA TARVITTAESSA RESET DATA NAPIN ALERTTI!!
return (
    <View style={[styles.container, styles.container]}>
      <Text style={[styles.title, styles.title]}>Options</Text>


    <View style={styles.optionsContainer}>
    <View style={styles.Row}>
       <Text style={[styles.Label, styles.Label]}>Music</Text>
      <TouchableOpacity style={[styles.button, MusicOn && styles.activeButton]} onPress={Music}>
        <Text style={styles.buttonTitle}>{MusicOn ? "On":"Off"}</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.Row}>
        <Text style={[styles.Label, styles.Label]}>SFX</Text>
      <TouchableOpacity style={[styles.button, SfxOn && styles.activeButton]} onPress={Sfx}>
        <Text style={styles.buttonTitle}>{SfxOn ? "On":"Off"}</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.Row}>
          <Text style={[styles.Label, styles.Label]}>Dark Mode</Text>
          <TouchableOpacity style={styles.button}  onPress={toggleDarkMode}>
            <Text style={styles.buttonTitle}>{isDarkMode ? "On" : "Off"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.resetButton, styles.resetButton]}
        onPress={resetData}
      >
        <Text style={styles.buttonTitle}>RESET DATA</Text>
      </TouchableOpacity>
      
       <TouchableOpacity style={[styles.button,styles.returnButton]} onPress={() => Navigation.goBack()}>
       <Text style={styles.buttonTitle}>Return</Text>
       </TouchableOpacity>

    </View>
);
};
  export default OptionScreen;