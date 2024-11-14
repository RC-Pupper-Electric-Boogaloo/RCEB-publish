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
  };
};

export default DarkTheme;