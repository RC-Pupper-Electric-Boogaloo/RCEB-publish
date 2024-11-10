import Matter from "matter-js"
import Char from "../components/Char"
import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";
import Point from "../components/Point";
import Wall from "../components/Wall";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const initialCharPositionX = windowWidth / 2;
const initialCharPositionY = windowHeight - 30

export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false })

    let world = engine.world

    world.gravity.y = 0.4

    return {
        physics: { engine, world },
        Char: Char(world, 'red', { x: initialCharPositionX, y: initialCharPositionY }, { height: 40, width: 40 }),
        Obstacle: Obstacle(world, 'Obstacle', 'black', { x: 60, y: -50 }, { height: 60, width: 60 }),
        Point: Point(world, 'orange', { x: 260, y: -50 }, { width: 100 }),
        RightWall: Wall(world, "black", { x: windowWidth - 10, y: windowHeight / 2 }, { height: windowHeight, width: 20 }),
        LeftWall: Wall(world, "black", { x: 10, y: windowHeight / 2 }, { height: windowHeight, width: 20 }),
    }
}