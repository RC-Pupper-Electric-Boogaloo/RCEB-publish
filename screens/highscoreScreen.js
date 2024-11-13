import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HighscoreScreen({ points, onReturn, navigation }) {
    const [highScores, setHighScores] = useState([]);

    // Lataa ja päivittää highscoret aluksi ja aina, kun points muuttuu
    useEffect(() => {
        const saveAndLoadScores = async () => {
            if (points) await savePoints(points);
            const scores = await loadHighScores();
            setHighScores(scores);
        };
        saveAndLoadScores();
    }, [points]);

    // Tallentaa pisteet AsyncStorageen
    const savePoints = async (points) => {
        try {
            const savedScores = await AsyncStorage.getItem('HIGHSCORES'); // Ladataan nykyiset highscoret AsyncStorageista
            let scoresArray = savedScores ? JSON.parse(savedScores) : [];
            scoresArray.push(points); // Lisää nykyiset pisteet listaan
            await AsyncStorage.setItem('HIGHSCORES', JSON.stringify(scoresArray));  // Tallennetaan päivitetty lista takaisin AsyncStorageiin
        } catch (e) {
            console.error("Pisteiden tallennus epäonnistui", e);
        }
    };
    // Ladataan highscoret AsyncStoragesta
    const loadHighScores = async () => {
        try {
            const savedScores = await AsyncStorage.getItem('HIGHSCORES');// Haetaan tallennetut highscoret
            let scoresArray = savedScores ? JSON.parse(savedScores) : [];
            // Järjestetään tulokset laskevaan järjestykseen ja pidetään vain top 10
            return scoresArray.sort((a, b) => b - a).slice(0, 10);
        } catch (e) {
            console.error("Highscorejen lataaminen epäonnistui", e);
            return [];
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.item}>
            <Text style={styles.score}>{index + 1}. {item}</Text>
            <Text style={styles.name}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Highscores</Text>
            <FlatList
                style={styles.list}
                data={highScores}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity style={styles.button}
                onPress={() => { navigation.navigate('MainMenu') }}
            >
                <Text style={styles.buttonText}>
                    RETURN
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: Constants.statusBarHeight,
        marginBottom: 20,
    },
    list: {
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
    },
    name: {
        fontSize: 18,
    },
    score: {
        fontSize: 18,
    },
})