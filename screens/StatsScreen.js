import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';

const StatsScreen = ({navigation}) => {

  const { isDarkMode, toggleDarkMode, setIsDarkMode } = useTheme();
  const styles = DarkTheme(isDarkMode);


  return (
    <View style={styles.container}>
        <Text style={styles.title}>AllTimeStats</Text>
        <View style={styles.optionsContainer}>
       <Text style={styles.Label}>Total Points: </Text>
       <Text style={styles.Label}>Total Time Spent: </Text>
       <Text style={styles.Label}>Total Coins: </Text>
       <Text style={styles.Label}>Games Played: </Text>
       </View>
       <TouchableOpacity style={[styles.button, styles.returnButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonTitle}>Return</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StatsScreen;

