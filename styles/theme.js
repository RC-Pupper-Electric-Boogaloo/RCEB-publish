import Constants from 'expo-constants';

const DarkTheme = (isDarkMode) => {
  return {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
      alignItems: 'center',
      padding: 20,
      justifyContent: 'center',

    },
    title: {
      fontSize: 24,
      color: isDarkMode ? '#FFF' : '#000',
      fontWeight: 'bold',
      marginTop: Constants.statusBarHeight
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
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    name: {
      fontSize: 18,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    score: {
      fontSize: 18,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },

    Label: {
      fontSize: 18,
      color: isDarkMode ? '#FFFFFF' : '#000000',

    },
    Row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    pointsText: {
      textAlign: 'center',
      color: isDarkMode ? '#FFFFFF' : '#000000',
      fontSize: 40,
      fontWeight: 'bold',
      margin: 20,
      zIndex: 100,
      position: 'absolute',
      right: 20,
    },
    coinsText: {
      textAlign: 'center',
      color: isDarkMode ? '#FFFFFF' : '#000000',
      fontSize: 20,
      fontWeight: 'bold',
      position: 'absolute',
      top: 60,
      right: 20,
    },

    //BUTTONIT
    button: {
      backgroundColor: isDarkMode ? '#333' : '#4CAF50',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      marginBottom: 5,
    },
    buttonTitle: {
      fontSize: 16,
      color: isDarkMode ? '#FFF' : '#000',
      fontWeight: 'bold',
    },
    activeButton: {
      backgroundColor: isDarkMode ? '#FF5722' : '#FF5722',
    },
    resetButton: {
      backgroundColor: isDarkMode ? '#F44336' : '#F44336',
    },
    returnButton: {
      backgroundColor: isDarkMode ? '#2196F3' : '#2196F3',
    },
    BButton: {
      backgroundColor: '#4CAF50',
      width: '20%',
    },
    TLButton: {
      backgroundColor: '#FFA500',
    },
    RAdsButton: {
      backgroundColor: '#FF5722',
    },
    WAdButton: {
      backgroundColor: '#2196F3',
    },
    buttonText: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 30,
      textAlign: 'center'
    },
 //Optionsview
    optionsContainer: {
      flex: 1,
      justifyContent: 'center',
    },

    //SKINIT
    skinsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    skinBox: {
      width: 75,
      height: 75,
      margin: 2,
      borderRadius: 10,
      overflow: 'hidden',
    },
    skinImage: {
      width: '100%',
      height: '100%',
    },
    purchased: {
      opacity: 0.5,
    },
    purchasedSkin: {
      tintColor: 'gray'
    },
    selectedSkinBox: {
      borderWidth: 3,
      borderColor: 'gold',
    },

    //Mainmenu
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    containerMainMenu: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative', 
    },
    ButtonMainMenu: {
      backgroundColor: 'red',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginBottom: 10
    },
    ButtonMainMenuText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },

    //StartScreen

  startButton: {
      backgroundColor: 'red',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      position: 'absolute',  
      bottom: '10%', 
    },
    startButtonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
  };
};

export default DarkTheme;