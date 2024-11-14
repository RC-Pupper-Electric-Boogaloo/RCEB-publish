import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const SkinPrices = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500]; 

  const { isDarkMode, toggleDarkMode, setIsDarkMode } = useTheme();
  const styles = DarkTheme(isDarkMode);

  const [selectedSkin, setSelectedSkin] = useState(null)
  const [purchasedSkins, setPurchasedSkins] = useState([])
//ladataan tiedot
  useEffect(() => {
    const loadData = async () => {
      try {
        const mySkins = await AsyncStorage.getItem('purchasedSkins');
        if (mySkins) {
          setPurchasedSkins(JSON.parse(mySkins));
        }
      } catch (error) {
        console.error("Error loading purchased skins", error);
      }}
      loadData();
    }, []);
//tallennetaan tiedot
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('purchasedSkins', JSON.stringify(purchasedSkins))
      } catch (error) {
        console.error("Error saving purchased skins", error)
      }
    }; saveData();
  }, [purchasedSkins]);

  const selectSkin = (index) => {
    if (!purchasedSkins.includes(index)) {
      setSelectedSkin(index);
  }
};

const handlePurchase = () => {
  if (selectedSkin === null) {
    return;
  }

    setPurchasedSkins([...purchasedSkins, selectedSkin]);
  };

  return (
    <View style={styles.container}>
     <Text style={styles.title}>Shop</Text>
     <Text style={styles.Label}>Your Coins: {}</Text>

    <View style={styles.skinsContainer}>
     {Skins.map((skin, index) => {
     const isPurchased = purchasedSkins.includes(index);
     const isSelected = selectedSkin === index;
      return (
     <TouchableOpacity key={index} style={[ styles.skinBox, isSelected && styles.selectedSkinBox,  isPurchased && styles.purchased, ]}
      onPress={!isPurchased ? () => selectSkin(index) : null} >
      <Image source={skin} style={[styles.skinImage, isPurchased && styles.purchasedSkin]} />
     </TouchableOpacity>
      )})}
    </View>

    {selectedSkin !== null && (
            <>
              <Text style={styles.Label}>Name: Skin {selectedSkin + 1}</Text>
              <Text style={styles.Label}>Price: {SkinPrices[selectedSkin]} Coins</Text>
            </>
          )}

      <TouchableOpacity style={[styles.button, styles.BButton]} onPress={handlePurchase}>
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