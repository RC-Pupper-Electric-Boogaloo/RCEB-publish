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
      marginBottom: 20,
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
      color: isDarkMode ? '#FFF' : '#000',
      fontSize: 40,
      fontWeight: 'bold',
      margin: 20,
      zIndex: 100,
      position: 'absolute',
      right: 20,
    },
    coinsText: {
      textAlign: 'center',
      color: isDarkMode ? '#FFF' : '#000',
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
      marginBottom: 150,
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
      backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
      alignItems: 'center',
      padding: 20,
      justifyContent: 'center',

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
      marginBottom: 10,
      width: '60%',
    },
    ButtonMainMenuText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    //StartScreen
    containerStart: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 50,

    },
  startButton: {
      backgroundColor: 'red',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginBottom: 10
    },
    startButtonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
  
  //highscore
  Hbackground: {
      flex: 1,
      paddingTop: 50,
      paddingBottom: 50,
      justifyContent: 'center',
      alignItems: 'center',
  },
  Hcontainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 10,
      borderRadius: 10,
      width: '90%',
      paddingTop: 40, 
      paddingBottom: 40, 
  },
  Htitle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
      marginTop: Constants.statusBarHeight,
  },
  Hlist: {
      width: '100%',
      marginBottom: 20,
  },
  Hitem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
  },
  Hrank: {
      fontSize: 20,
      color: '#FFD700',
      fontWeight: 'bold',
  },
  Hscore: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
      flexShrink: 1,
  },
  Hbutton: {
      backgroundColor: '#3498db',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 10,
  },
  HbuttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
  },

  // GameoverScreen
   backgroundGameOver: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
  },
  containerGameOver: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  
    padding: 20,
    borderRadius: 10,
},
pointsTextGameOver: {
  fontSize: 30,
  color: 'white',
  marginBottom: 20,
},
coinsContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
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
buttonGameover: {
  backgroundColor: '#3498db',
  paddingVertical: 15,
  paddingHorizontal: 40,
  borderRadius: 10,
},
buttonTextGameOver: {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
},

//STATSSCREEN
backgroundStats: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
containerStats: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: 20,
  borderRadius: 10,
},
titleStat: {
  fontSize: 35,
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 20,
},
statsText: {
  fontSize: 20,
  color: 'white',
  marginBottom: 10,
},
buttonStats: {
  backgroundColor: '#3498db',
  paddingVertical: 15,
  paddingHorizontal: 40,
  borderRadius: 10,
},
buttonTextStats: {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
},

//GUIDESCREEN
Guidecontainer: {
  flexGrow: 1,
  padding: 20,
  backgroundColor: isDarkMode ? "#121212" : "#f5f5f5",
},
Guidetitle: {
  fontSize: 28,
  fontWeight: "bold",
  color: isDarkMode ? "#ffffff" : "#333333",
  marginBottom: 20,
  textAlign: "center",
},
Guidesection: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 20,
  backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
  padding: 10,
  borderRadius: 8,
},
Guideimage: {
  width: 80,
  height: 80,
  marginRight: 15,
  resizeMode: "contain",
},
GuideCenter: {
  flex: 1,
  justifyContent: "center",
},
sectionTitle: {
  fontSize: 20,
  fontWeight: "bold",
  color: isDarkMode ? "#ffa500" : "#ff8c00",
  marginBottom: 5,
},
Guidetext: {
  fontSize: 16,
  lineHeight: 22,
  color: isDarkMode ? "#e0e0e0" : "#4a4a4a",
},

  };
};

export default DarkTheme;