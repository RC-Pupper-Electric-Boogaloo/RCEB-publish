import { Dimensions } from "react-native";
import Matter from 'matter-js';


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
const wallThickness = 30;

export const getWalls = () => {

    //Vasen seinä
    const wallLeft = Matter.Bodies.rectangle(
        -wallThickness / 2, 
        windowHeight / 2, 
        wallThickness, 
        windowHeight * 2, 
        { isStatic: true } 
    );
    //Oikea seinä
    const wallRight = Matter.Bodies.rectangle(
        windowWidth + wallThickness / 2, 
        windowHeight / 2, 
        wallThickness, 
        windowHeight * 2, 
        { isStatic: true } 
    );

    return { wallLeft, wallRight }
}