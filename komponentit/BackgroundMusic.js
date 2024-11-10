import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

export const usePlayCollisionSound = () => {
    const [sound, setSound] = useState(null);

    useEffect(() => {
        const loadSound = async () => {
            const collisionSound = new Audio.Sound();
            await collisionSound.loadAsync(require('../assets/end.wav'));
            setSound(collisionSound);
        };

        loadSound();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    return async () => {
        if (sound) {
            await sound.replayAsync();
        }
    };
};

export const usePlayPointSound = () => {
    const [pointSound, setPointSound] = useState(null);

    useEffect(() => {
        const loadSound = async () => {
            const pointSound = new Audio.Sound();
            await pointSound.loadAsync(require('../assets/point.wav'));
            setPointSound(pointSound);
        };

        loadSound();

        return () => {
            if (pointSound) {
                pointSound.unloadAsync();
            }
        };
    }, []);

    return async () => {
        if (pointSound) {
            await pointSound.replayAsync();
        }
    };
};

const BackgroundMusic = () => {
    useEffect(() => {
        const playBackgroundMusic = async () => {
            const backgroundSound = new Audio.Sound();
            await backgroundSound.loadAsync(require('../assets/bgm.mp3'));
            await backgroundSound.setIsLoopingAsync(true);
            await backgroundSound.playAsync();

            return () => {
                backgroundSound.unloadAsync();
            };
        };

        playBackgroundMusic();
    }, []);

    return null; // Ei tarvitse palauttaa näkyvää elementtiä
};

export default BackgroundMusic;
