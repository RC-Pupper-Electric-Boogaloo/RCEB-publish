import Constants from 'expo-constants'
import { Dimensions } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const DarkTheme = (isDarkMode) => {

  const insets = useSafeAreaInsets()
  const textWhite = '#FFFDFA'
  const themeBlue = '#3498db'
  const containerBackgroundColor = isDarkMode ? 'rgba(227, 137, 17, 0.9)' : 'rgba(250, 165, 55, 0.9)'

  return {
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: 24,
      color: themeBlue,
      fontWeight: 'bold',
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    name: {
      fontSize: 18,
      color: isDarkMode ? textWhite : '#000000',
    },
    score: {
      fontSize: 18,
      color: isDarkMode ? textWhite : '#000000',
    },
    label: {
      fontSize: 18,
      color: themeBlue,
      fontWeight: 'bold',
      backgroundColor: 'red',
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      backgroundColor: isDarkMode ? '#1e1e1e' : '#FFF9F3',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      lineHeight: 22,
      color: isDarkMode ? textWhite : '#000000',
    },

    //GAMESCREEN
    pointsText: {
      textAlign: 'center',
      color: isDarkMode ? textWhite : '#000',
      fontSize: 40,
      fontWeight: 'bold',
      margin: 20,
      zIndex: 100,
      position: 'absolute',
      right: 20,
    },
    coinsText: {
      textAlign: 'center',
      color: isDarkMode ? textWhite : '#000',
      fontSize: 20,
      fontWeight: 'bold',
      position: 'absolute',
      top: 60,
      right: 20,
    },

    //BUTTONIT
    button: {
      backgroundColor: themeBlue,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonTitle: {
      fontSize: 16,
      color: textWhite,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    activeButton: {
      backgroundColor: isDarkMode ? '#FF5722' : '#FF5722',
    },
    resetButton: {
      backgroundColor: '#F44336',
      marginBottom: -5,
    },
    returnButton: {
      paddingVertical: 10,
      paddingHorizontal: 30,
      marginTop: 16,
      marginBottom: 6,
      borderRadius: 10,
      textAlign: 'center',
      backgroundColor: '#2196F3',
      width: '60%',
    },
    bButton: { // shopin napit.
      backgroundColor: isDarkMode ? '#2196F3' : '#2196F3',
    },
    buttonStart: {
      backgroundColor: '#FD8A0B',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginBottom: 10,
      width: '44%',
    },

    //Optionsview
    optionsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Constants.statusBarHeight + 8,
      marginBottom: insets.bottom + 8,
      width: '100%',
    },
    optionsColorContainer: {
      flex: 1,
      backgroundColor: containerBackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      borderRadius: 10,
      padding: 10,
      marginBottom: '65%',
    },
    optionsBottomContainer: {
      backgroundColor: containerBackgroundColor,
      width: '90%',
      borderRadius: 10,
      alignItems: 'center',
      padding: 5,
    },
    optionsRowContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },

    //SKINIT
    skinsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      alignItems: 'center',
      padding: 40,
      justifyContent: 'center',

    },
    skinBox: {
      width: windowWidth / 6,
      height: windowWidth / 6,
      margin: 2,
      borderRadius: 10,
      overflow: 'hidden',
    },
    skinImage: {
      width: '100%',
      height: '100%',
      opacity: 0.5,
    },
    purchased: {
      opacity: 1,
    },
    selectedSkinBox: {
      borderWidth: 3,
      borderColor: 'gold',
    },

    //Mainmenu
    containerMainMenu: { // on myös optionScreenissä
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      paddingTop: 200,
    },
    buttonMainMenu: {
      backgroundColor: '#FD8A0B',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginBottom: 10,
      width: '55%',
    },
    //StartScreen
    containerStart: { // on myös shopScreenissä
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 50,
    },

    //Highscore
    hRank: {
      fontSize: 20,
      color: '#FFD700',
      fontWeight: 'bold',
    },
    hScore: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
      flexShrink: 1,
    },

    //GameoverScreen
    containerGameOver: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: containerBackgroundColor,
      width: '60%',
      padding: 20,
      borderRadius: 10,
    },
    pointsTextGameOver: {
      fontSize: 30,
      color: 'white',
      marginBottom: 10,
    },
    coinsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    coinImage: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    coinsTextGameOver: {
      fontSize: 25,
      color: 'white',
    },
    gameOverText: {
      fontSize: 16,
      color: 'white',
      marginBottom: 10,
      textAlign: 'center',
    },
    initialsInput: {
      backgroundColor: isDarkMode ? '#1e1e1e' : textWhite,
      placeholderTextColor: '#FD8A0B',
      color: '#FD8A0B',
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 10,
    },
    gameOverButton: {
      backgroundColor: themeBlue,
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 10,
      marginBottom: 10,
    },

    //guideScreen, statsScreen, achievementScreen ja highscoreScreen
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Constants.statusBarHeight + 8,
      marginBottom: insets.bottom,
    },
    colorContainer: {
      flex: 1,
      backgroundColor: containerBackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    screenHeader: {
      fontSize: 32,
      color: textWhite,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    scrollViewContent: {
      alignItems: 'center',
      borderRadius: 10,
      paddingRight: 8,
      width: '90%',
      marginBottom: 20,
      paddingBottom: 0,
    },
    guideSection: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      backgroundColor: isDarkMode ? "#1e1e1e" : "#FFF9F3",
      padding: 10,
      borderRadius: 10,
    },
    guideSectionLast: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#1e1e1e" : "#FFF9F3",
      padding: 10,
      borderRadius: 10,
    },
    guideImage: {
      width: 80,
      height: 80,
      marginRight: 15,
      resizeMode: "contain",
    },
    guideCenter: {
      flex: 1,
    },
  }
}

export default DarkTheme