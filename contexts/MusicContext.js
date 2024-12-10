import React, { createContext, useState, useRef, useEffect } from 'react'
import BackgroundMusic from '../components/BackgroundMusic'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const MusicContext = createContext()

export const MusicProvider = ({ children }) => {
  const [musicOn, setMusicOn] = useState(false)
  const [musicSource, setMusicSource] = useState(null)
  const stopMusicRef = useRef()

  useEffect(() => {
    const loadMusicSetting = async () => {
      try {
        const savedMusic = await AsyncStorage.getItem('MusicOn')
        if (savedMusic !== null) {
          setMusicOn(savedMusic === 'true')
        } else {
          setMusicOn(true); // Oletusarvoksi true
          await AsyncStorage.setItem('MusicOn', 'true'); // Tallennetaan oletusarvo
        }
      } catch (error) {
        console.error('Error loading music setting:', error)
      }
    }

    loadMusicSetting()
  }, [])

  useEffect(() => {
    if (musicOn) {
      if (stopMusicRef.current) {
        stopMusicRef.current()
      }
    } else {
      if (stopMusicRef.current) {
        stopMusicRef.current() 
      }
    }
  }, [musicOn])

  const toggleMusic = async () => {
    const newMusicState = !musicOn
    setMusicOn(newMusicState)
    await AsyncStorage.setItem('MusicOn', JSON.stringify(newMusicState))
  }

  const setMusic = (source) => {
    setMusicSource(source)
  }

  return (
    <MusicContext.Provider value={{ musicOn, toggleMusic, stopMusicRef, setMusic }}>
      {musicOn && musicSource && (<BackgroundMusic stopRef={stopMusicRef} source={musicSource} />)}
      {children}
    </MusicContext.Provider>
  )
}