import { Audio } from 'expo-av';
import { useEffect } from 'react';

const BackgroundMusic = () => {
    useEffect(() => {
        let sound;

        const playSound = async () => {
            sound = new Audio.Sound();
            try {
                await sound.loadAsync(require('../assets/bgm.mp3'));
                await sound.setIsLoopingAsync(true);
                await sound.playAsync();
            } catch (error) {
                console.error("Error loading sound:", error);
            }
        };

        playSound();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    return null;
};

export default BackgroundMusic;
