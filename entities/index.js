import Matter from "matter-js"
import Char from "../components/Char"
import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const initialCharPositionX = windowWidth / 2;
const initialCharPositionY = windowHeight - 30

export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false })

    let world = engine.world

    world.gravity.y = 0.4 // muutettu 0.4-->0 jottei char komponentti tipu ruudula

    return {
        physics: { engine, world },
        Char: Char(world, 'red', { x: initialCharPositionX, y: initialCharPositionY }, { height: 40, width: 40 }),
        Obstacle: Obstacle(world, 'Obstacle', 'black', { x: 60, y: 200 }, { height: 50, width: 50 }),
    }
}