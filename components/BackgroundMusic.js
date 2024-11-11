import { Audio } from 'expo-av';
import { useEffect, useState, useRef } from 'react';

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

const BackgroundMusic = ({ stopRef }) => {
    const backgroundSound = useRef(new Audio.Sound());

    useEffect(() => {
        const playBackgroundMusic = async () => {
            await backgroundSound.current.loadAsync(require('../assets/bgm.mp3'));
            await backgroundSound.current.setIsLoopingAsync(true);
            await backgroundSound.current.playAsync();
        };

        playBackgroundMusic();

        // Aseta pysäytysfunktio refiin, jotta App-komponentti voi käyttää sitä
        stopRef.current = async () => {
            if (backgroundSound.current) {
                await backgroundSound.current.stopAsync();
            }
        };

        return () => {
            backgroundSound.current.unloadAsync();
        };
    }, []);

    return null;
};


export default BackgroundMusic;
