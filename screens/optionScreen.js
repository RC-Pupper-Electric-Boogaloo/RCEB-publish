import React, { useState } from 'react';
import Constants from 'expo-constants';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';


const OptionScreen = ({onReturn}) => {

  const [MusicOn, setIsMusicOn] = useState(false);
  const [SfxOn, setIsSfxOn] = useState(false);
  const [DarkModeOn, setIsDarkModeOn] = useState(false);

  const Music = () => setIsMusicOn(!MusicOn);
  const Sfx = () => setIsSfxOn(!SfxOn);
  const DarkMode = () => setIsDarkModeOn(!DarkModeOn);
// ON/OFF NAPPEIHIN VAIN LISÄTTY VÄRIN MUUNNOS!!! EI MUUTEN TOIMINNALLISUUTTA, RESET DATA JA RETURN EI TEHE MITÄÄN
// POISTA TARVITTAESSA RESET DATA NAPIN ALERTTI!!
return (
    <View style={styles.container}>
    <Text style={styles.title}>Options</Text>


    <View style={styles.optionsContainer}>
    <View style={styles.Row}>
       <Text style={styles.Label}>Music</Text>
      <TouchableOpacity style={[styles.button, MusicOn && styles.activeButton]} onPress={Music}>
        <Text style={styles.buttonTitle}>{MusicOn ? "On":"Off"}</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.Row}>
        <Text style={styles.Label}>SFX</Text>
      <TouchableOpacity style={[styles.button, SfxOn && styles.activeButton]} onPress={Sfx}>
        <Text style={styles.buttonTitle}>{SfxOn ? "On":"Off"}</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.Row}>
        <Text style={styles.Label}>DarkMode</Text>
      <TouchableOpacity style={[styles.button, DarkModeOn && styles.activeButton]} onPress={DarkMode}>
        <Text style={styles.buttonTitle}>{DarkModeOn ? "On":"Off"}</Text>
      </TouchableOpacity>
    </View>
    </View>

      <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={() => alert ('Data reset nappi toimii')}>
       <Text style={styles.buttonTitle}>RESET DATA</Text>
       </TouchableOpacity>

       <TouchableOpacity style={[styles.button, styles.returnButton]} onPress={onReturn}>
       <Text style={styles.buttonTitle}>Return</Text>
       </TouchableOpacity>

    </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  padding: 20,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
},
Row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 10,
},
Label: {
    fontSize: 18,
    marginRight: 10,
},
optionsContainer: {
  flex: 1,
  justifyContent: 'center',
},

 // BUTTONIT
button: {
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 5,
  backgroundColor: '#4CAF50',
  marginBottom: 5,
},
buttonTitle: {
  fontSize: 16,
  color: 'black',
  fontWeight: 'bold',
},
activeButton: {
  backgroundColor: '#FF5722',
},
resetButton: {
  backgroundColor: '#F44336',
},
returnButton: {
  backgroundColor: '#2196F3',
},
});

      
  export default OptionScreen;