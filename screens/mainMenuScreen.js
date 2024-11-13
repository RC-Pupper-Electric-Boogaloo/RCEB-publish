import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';

const MainMenuScreen = () => {
    const { isDarkMode, toggleDarkMode, setIsDarkMode } = useTheme();
    const styles = DarkTheme(isDarkMode);
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}
                onPress={() => { }}
            >
                <Text style={styles.buttonText}>
                    PLAY
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={() => { }}
            >
                <Text style={styles.buttonText}>
                    HIGHSCORES
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={() => { }}
            >
                <Text style={styles.buttonText}>
                    OPTIONS
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={() => { }}
            >
                <Text style={styles.buttonText}>
                    SHOP
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default MainMenuScreen;