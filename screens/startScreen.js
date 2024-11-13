import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function StartScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { navigation.navigate('MainMenu') }}
            >
                <Text style={styles.buttonText}>START</Text>
            </TouchableOpacity>
        </View>
    )
}

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
})