import Matter from "matter-js"
import Char from "../components/Char";
import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";
import Point from "../components/Point";
import Wall from "../components/Wall";
import Backdrop from "../components/Backdrop";
import Coin from "../components/Coin";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const initialCharPositionX = windowWidth / 2; 
const initialCharPositionY = windowHeight - 50 
const charSize = windowWidth / 4; 

export default (restart, imageSource, skin) => {
    let engine = Matter.Engine.create({ enableSleeping: false })

    let world = engine.world

    world.gravity.y = 0.4

    return {
        physics: { engine, world },
        Backdrop: Backdrop(world, 'Backdrop', 'black', { x: windowWidth / 2, y: (windowHeight / 2) *1.3 }, { height: windowHeight, width: windowWidth }, imageSource),
        Char: Char(world, 'Char', 'red', { x: initialCharPositionX, y: initialCharPositionY }, { height: charSize, width: charSize }, skin),
        Obstacle: Obstacle(world, 'Obstacle', 'black', { x: 60, y: -50 }, { height: 60, width: 60 }, require('../assets/Cat.png')),
        Choco: Obstacle(world, 'Choco', 'black', { x: 160, y: -150 }, { height: 80, width: 80 }, require('../assets/Choco.png')),
        Point: Point(world, 'orange', { x: 260, y: -50 }, { width: 100 }),
        Coin: Coin(world, 'gold', { x: 260, y: -5*windowHeight }, { width: 70 }),
    }
    
}