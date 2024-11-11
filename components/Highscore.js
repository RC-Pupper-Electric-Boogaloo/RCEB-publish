import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HighScore = () => {
  const [highScores, setHighScores] = useState([]);
  
  useEffect(() => {
    const fetchHighScores = async () => {
      const scores = await loadHighScores();
      setHighScores(scores);
    };
    fetchHighScores();
  }, []);

  const savePoints = async (points) => {
    try {
      // Hae nykyinen highscore-lista AsyncStoragesta
      const savedScores = await AsyncStorage.getItem('HIGHSCORES');
      let scoresArray = savedScores ? JSON.parse(savedScores) : [];
  
      // Lisää uusi tulos listaan
      scoresArray.push(points);
  
      // Järjestetään pisteet laskevassa järjestyksessä
      scoresArray.sort((a, b) => b - a);

      if (scoresArray.length > 10) {
        scoresArray = scoresArray.slice(0, 10); // Säilytetään vain 10 parasta
      }
  
      // Tallenna päivitetty lista takaisin AsyncStorageen
      await AsyncStorage.setItem('HIGHSCORES', JSON.stringify(scoresArray));
      console.log("Pisteet tallennettu highscore-listaan:", scoresArray);
  
      // Päivitä komponentin tila
      setHighScores(scoresArray);
    } catch (e) {
      console.error("Pisteiden tallennus epäonnistui", e);
    }
  };

  // haetaan highscore lista AsyncStoragesta
  const loadHighScores = async () => {
    try {
      const savedScores = await AsyncStorage.getItem('HIGHSCORES');
      let scoresArray = savedScores ? JSON.parse(savedScores) : [];
      scoresArray.sort((a, b) => b - a); // Järjestetään laskevasti

      if (scoresArray.length > 10) {
        scoresArray = scoresArray.slice(0, 10); // Säilytetään vain 10 parasta
      }
      console.log("Ladattu Highscore:", scoresArray);
      return scoresArray;
    } catch (e) {
      console.error("Highscoreitten lataaminen epäonnistui", e);
      return [];
    }
  };



  return {
    highScores,
    savePoints,
  };
};

export default HighScore;