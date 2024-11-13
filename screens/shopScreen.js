import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';
//Skinien importit 
import S1 from '../assets/S1.png';
import S2 from '../assets/S2.png';
import S3 from '../assets/S3.png';
import S4 from '../assets/S4.png';
import S5 from '../assets/S5.png';
import S6 from '../assets/S6.png';
import S7 from '../assets/S7.png';
import S8 from '../assets/S8.png';
const ShopScreen = ({ onReturn, navigation }) => {

  const Skins = [S1, S2, S3, S4, S5, S6, S7, S8];
  const { isDarkMode, toggleDarkMode, setIsDarkMode } = useTheme();
  const styles = DarkTheme(isDarkMode);

  // LISÄÄ TOIMINNALLISUUS JA TARVITTAESSA POISTA ALERT POIS!
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop</Text>


      <View style={styles.skinsContainer}>
        {Skins.map((skin, index) => (
          <TouchableOpacity key={index} style={styles.skinBox} onPress={() => alert('Skiniä painettu :D')}>
            <Image source={skin} style={styles.skinImage} />
          </TouchableOpacity>
        ))}
      </View>


      <Text style={styles.label}>Name: </Text>
      <Text style={styles.label}>Price: </Text>

      <TouchableOpacity style={[styles.button, styles.BButton]} onPress={() => alert('Osto nappi toimii')}>
        <Text style={styles.buttonTitle}>Buy</Text>
      </TouchableOpacity>
      {/*  
      <TouchableOpacity style={[styles.button, styles.TLButton]} onPress={() => alert('Try Your Luck nappi toimii')}>
        <Text style={styles.buttonTitle}>Try Your Luck 20 Coins</Text>
      </TouchableOpacity>
    
      <TouchableOpacity style={[styles.button, styles.RAdsButton]} onPress={() => alert('Remove Ads nappi toimii')}>
        <Text style={styles.buttonTitle}>Remove Ads 3€</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.WAdButton]} onPress={() => alert('Watch Ad nappi toimii')}>
        <Text style={styles.buttonTitle}>Watch Ad for Coin</Text>
      </TouchableOpacity>
    */}
      <TouchableOpacity style={[styles.button, styles.returnButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonTitle}>Return</Text>
      </TouchableOpacity>
    </View>
  );
};



export default ShopScreen;