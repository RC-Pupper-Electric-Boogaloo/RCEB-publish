import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

const highscores = [
    { id: '1', name: 'Player1', score: 100 },
    { id: '2', name: 'Player2', score: 93 },
    { id: '3', name: 'Player3', score: 89 },
    { id: '4', name: 'Player4', score: 84 },
    { id: '5', name: 'Player5', score: 76 },
];

const HighscoreScreen = () => {
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Highscores</Text>
            <FlatList
                style={styles.list}
                data={highscores}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <View style={styles.returnbutton}>
                <Button title="Return" onPress={() => navigation.goBack()} />
            </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
        marginBottom: 20,
    },
    returnbutton: {
        marginTop: 20,
        width: '60%',
    },
    name: {
        fontSize: 18,
    },
    score: {
        fontSize: 18,
    },
});

export default HighscoreScreen;