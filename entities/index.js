import Matter from "matter-js"

import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false })

    let world = engine.world

    world.gravity.y = 0.4;

    return {
        physics: { engine, world },
        Obstacle: Obstacle(world, 'black', { x: 60, y: 200 }, { height: 100, width: 100 }),
    }
}