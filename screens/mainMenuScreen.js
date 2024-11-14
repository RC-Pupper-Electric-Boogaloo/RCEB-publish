import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

export default function MainMenuScreen({ navigation }) {
    return (
    <ImageBackground
      source={require('../assets/Taustakuva.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.Button} onPress={() => { navigation.navigate('Game') }}>
            <Text style={styles.ButtonText}>PLAY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={() => { navigation.navigate('Highscore') }}>
            <Text style={styles.ButtonText}>HIGHSCORES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Options')}>
            <Text style={styles.ButtonText}>OPTIONS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.ButtonText}>SHOP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button}  onPress={() => navigation.goBack()}>
            <Text style={styles.ButtonText}>Return</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', 
  },
  Button: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10
  },
  ButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});