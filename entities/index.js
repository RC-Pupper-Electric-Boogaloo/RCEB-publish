import Matter from "matter-js"
import { Char } from "../components/Char";
import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";
import { getWalls } from "../Components/Wall";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const initialCharPositionX = windowWidth / 2; // keskitetään char
const initialCharPositionY = windowHeight - 50 //tuodaan char:ia ylemmäksi alareunasta
const charSize = windowWidth / 4; // otetaan char:in leveydeksi näytön koosta 3osa

export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false })

    let world = engine.world

    world.gravity.y = 0.4 // muutettu 0.4-->0 jottei char komponentti tipu ruudula

    //vasen ja oikea seinä
    const { wallLeft, wallRight } = getWalls();
    Matter.World.add(world, [wallLeft, wallRight]);

    return {
        physics: { engine, world },
        Char: Char(world, 'red', { x: initialCharPositionX, y: initialCharPositionY }, { height: charSize,  width: charSize }),
        Obstacle: Obstacle(world, 'black', { x: 60, y: 200 }, { height: 100, width: 100 }),
    }
    
}