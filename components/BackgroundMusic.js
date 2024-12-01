import { Audio } from 'expo-av'
import { useEffect, useState, useRef } from 'react'

export const usePlayCollisionSound = () => {
    const [sound, setSound] = useState(null)

    useEffect(() => {
        const loadSound = async () => {
            const collisionSound = new Audio.Sound()
            await collisionSound.loadAsync(require('../assets/end.wav'))
            setSound(collisionSound)
        }

        loadSound()

    return () => {
        if (sound) {
            sound.unloadAsync()
            }
        }
    }, [])

    return async () => {
        if (sound) {
            await sound.replayAsync()
        }
    }
}
export const usePlayPowerupSound = () => {
    const [powerupSound, setSound] = useState(null)

    useEffect(() => {
        const loadSound = async () => {
            const powerupSound = new Audio.Sound()
            await powerupSound.loadAsync(require('../assets/powerup.wav'))
            setSound(powerupSound)
        }

        loadSound()

    return () => {
        if (powerupSound) {
            powerupSound.unloadAsync()
            }
        }
    }, [])

    return async () => {
        if (powerupSound) {
            await powerupSound.replayAsync()
        }
    }
}
export const usePlayPointSound = () => {
    const [pointSound, setPointSound] = useState(null)

    useEffect(() => {
        const loadSound = async () => {
            const pointSound = new Audio.Sound()
            await pointSound.loadAsync(require('../assets/point.wav'))
            setPointSound(pointSound)
        }

    loadSound()

    return () => {
        if (pointSound) {
            pointSound.unloadAsync()
            }
        }
    }, [])

    return async () => {
        if (pointSound) {
            await pointSound.replayAsync()
        }
    }
}

const BackgroundMusic = ({ stopRef, source }) => {
    const backgroundSound = useRef(new Audio.Sound())

    useEffect(() => {
        const playBackgroundMusic = async () => {
            try {
                await backgroundSound.current.loadAsync(source)
                await backgroundSound.current.setIsLoopingAsync(true)
                await backgroundSound.current.playAsync()

                if (stopRef) {
                    stopRef.current = async () => {
                        if (backgroundSound.current) {
                            await backgroundSound.current.stopAsync()
                        }
                    }
                }
            } catch (error) {
                console.error("Error playing background music:", error)
            }
        }

        playBackgroundMusic()

        return () => {
            backgroundSound.current.unloadAsync()
        }
    }, [source])

    return null
}

export default BackgroundMusic