import Matter from "matter-js"
import Char from "../components/Char"
import { Dimensions } from "react-native"
import Obstacle from "../components/Obstacle"
import Point from "../components/Point"
import Wall from "../components/Wall"
import BackdropC from "../components/BackdropClassic"

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const initialCharPositionX = windowWidth / 2
const initialCharPositionY = windowHeight - 50
const charSize = windowWidth / 4

export default (restart, skin) => {
    let engine = Matter.Engine.create({ enableSleeping: false })

    let world = engine.world

    world.gravity.y = 0.4

    return {
        physics: { engine, world },
        Backdrop: BackdropC(world, 'Backdrop', 'black', { x: windowWidth / 2, y: windowHeight / 2 }, { height: windowHeight * 2, width: windowWidth }),
        Char: Char(world, 'Char', 'red', { x: initialCharPositionX, y: initialCharPositionY }, { height: 40, width: 40 }, skin),
        Obstacle: Obstacle(world, 'Obstacle', 'black', { x: 60, y: -50 }, { height: 60, width: 60 }, require('../assets/Obstacle.png')),
        Point: Point(world, 'Point', 'orange', { x: 260, y: -50 }, { width: 100 }, require('../assets/Point.png')),
        RightWall: Wall(world, "black", { x: windowWidth - 10, y: windowHeight / 2 }, { height: windowHeight, width: 20 }),
        LeftWall: Wall(world, "black", { x: 10, y: windowHeight / 2 }, { height: windowHeight, width: 20 }),
    }
    
}