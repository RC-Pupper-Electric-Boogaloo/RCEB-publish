import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MainMenuScreen = () => {

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'black',
        paddingHorizontal: 30,
        paddingVertical: 10,
        width: '70%',
        marginBottom: 20
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 30,
        textAlign: 'center'
    }
});

export default MainMenuScreen;