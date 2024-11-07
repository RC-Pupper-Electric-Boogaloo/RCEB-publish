import Matter from "matter-js"
import Char from "../components/Char"
import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";
import Point from "../components/Point";

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
        Obstacle: Obstacle(world, 'black', { x: 60, y: 200 }, { height: 100, width: 100 }),
        Point: Point(world, 'orange', { x: 260, y: 200 }, {width: 100}),
    }
}