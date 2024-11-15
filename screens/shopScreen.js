import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Skinien importit
import Skin1 from '../assets/S1.png';
import Skin2 from '../assets/S2.png';
import Skin3 from '../assets/S3.png';
import Skin4 from '../assets/S4.png';
import Skin5 from '../assets/S5.png';
import Skin6 from '../assets/S6.png';
import Skin7 from '../assets/S7.png';
import Skin8 from '../assets/S8.png';

const ShopScreen = ({ navigation }) => {
  const Skins = [Skin1, Skin2, Skin3, Skin4, Skin5, Skin6, Skin7, Skin8];
  const SkinNames = [
    'Sleeping Puppy', 'Angry Puppy', 'Give Me Puppy', 'Funny Puppy', 
    'No Cap Puppy', 'Gentle Puppy', 'Cow Puppy', 'Hoodie Puppy'
  ];
  const SkinPrices = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000];

  const { isDarkMode } = useTheme();
  const styles = DarkTheme(isDarkMode);

  const [selectedSkin, setSelectedSkin] = useState(null);
  const [purchasedSkins, setPurchasedSkins] = useState([]);
  const [coinCount, setCoinCount] = useState(0); // Track coin count from AsyncStorage

  // Load purchased skins and coin count from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const mySkins = await AsyncStorage.getItem('purchasedSkins');
        if (mySkins) {
          setPurchasedSkins(JSON.parse(mySkins));
        }

        const storedCoinCount = await AsyncStorage.getItem('coinCount');
        if (storedCoinCount) {
          setCoinCount(JSON.parse(storedCoinCount)); // Set coin count from AsyncStorage
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage", error);
      }
    };
    loadData();
  }, []); // Empty dependency array to run this only once when the component mounts

  const selectSkin = (index) => {
    if (!purchasedSkins.includes(index)) {
      setSelectedSkin(index);
    }
  };

  const handlePurchase = async () => {
    if (selectedSkin === null) {
      return;
    }

    const skinPrice = SkinPrices[selectedSkin];
    if (coinCount >= skinPrice) {
      // Update purchased skins and coins after successful purchase
      const updatedSkins = [...purchasedSkins, selectedSkin];
      setPurchasedSkins(updatedSkins);
      setCoinCount(coinCount - skinPrice); // Subtract the cost of the skin from coin count

      // Save the updated data to AsyncStorage
      try {
        await AsyncStorage.setItem('purchasedSkins', JSON.stringify(updatedSkins));
        await AsyncStorage.setItem('coinCount', JSON.stringify(coinCount - skinPrice));
      } catch (error) {
        console.error("Error saving data to AsyncStorage", error);
      }
    } else {
      alert("You don't have enough coins!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop</Text>
      <Text style={styles.Label}>Your Coins: {coinCount}</Text>

      <View style={styles.skinsContainer}>
        {Skins.map((skin, index) => {
          const isPurchased = purchasedSkins.includes(index);
          const isSelected = selectedSkin === index;
          return (
            <TouchableOpacity 
              key={index} 
              style={[styles.skinBox, isSelected && styles.selectedSkinBox, isPurchased && styles.purchased]}
              onPress={!isPurchased ? () => selectSkin(index) : null}
            >
              <Image source={skin} style={[styles.skinImage, isPurchased && styles.purchasedSkin]} />
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedSkin !== null && (
        <>
          <Text style={styles.Label}>Name: {SkinNames[selectedSkin]}</Text>
          <Text style={styles.Label}>Price: {SkinPrices[selectedSkin]} Coins</Text>
        </>
      )}
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

      <TouchableOpacity style={[styles.button, styles.BButton]} onPress={handlePurchase}>
        <Text style={styles.buttonTitle}>Buy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.returnButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonTitle}>Return</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShopScreen;
