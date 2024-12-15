import Matter from "matter-js"
import Petchar from "../components/Petchar"
import { Dimensions } from "react-native"
import { getRandom } from "../utils/random"
import Backdrop from "../components/Backdrop"
import Point from "../components/Point"
import Wall from "../components/Wall"

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


const charSize = windowWidth / 4
const startX = windowWidth * 0.10 // 10% from left
const endX = windowWidth * 0.85 // 15% before right edge
const bottomY = windowHeight * 0.90 // 10% from the bottom
const topY = windowHeight * 0.60 // 60% from the bottom

export default (restart, imageSource, skin, gravity) => {
    let engine = Matter.Engine.create({ enableSleeping: false })
    let world = engine.world

    world.gravity.y = 0
    world.gravity.x = 0
 
    

    let entities = {
        physics: { engine, world },
        Backdrop: Backdrop(world, 'Backdrop', 'black', { x: windowWidth / 2, y: (windowHeight / 2) * 1.3 }, { height: windowHeight, width: windowWidth }, imageSource),
        Char: Petchar(world, 'Char', 'red', { x: windowWidth / 2, y: windowHeight / 2 }, { height: charSize, width: charSize }, skin),
        Heart: Point(world, 'Heart', 'black',  { x: windowWidth * 2, y: windowHeight * 2}, { height: 40, width: 40 }, require('../assets/heart2.png')),
        Treat: Point(world, 'Treat', 'black',  { x: endX +20, y: topY / 2 +20}, { height: 40, width: 50 }, require('../assets/Treat.png')),
        Treasure: Point(world, 'Treasure', 'black',  { x: windowWidth * 2, y: windowHeight * 2}, { height: 80, width: 50 }, require('../assets/Treasure.png')),
        RightWall: Wall(world, "black", { x: endX, y: topY}, { height: topY * 2 - bottomY * 2, width: 20 }),
        LeftWall: Wall(world, "black", { x: startX, y: topY }, { height: topY * 2 - bottomY * 2, width: 20 }),
        TopWall: Wall(world, "black", { x: endX / 2 +windowWidth*0.05, y: topY /2 }, { height: 20, width: endX - startX + 20 }),
        BottomWall: Wall(world, "black", { x: endX / 2 +windowWidth*0.05, y: bottomY }, { height: 20, width: endX - startX + 20 }),
    }

    let char = Petchar(world, 'Char', 'red', { x: windowWidth / 2, y: windowHeight / 2 }, { height: charSize, width: charSize }, skin)
    Matter.Body.setVelocity(char.body, { x: getRandom(-2,2), y: getRandom(-2,2) })
    entities.Char = char

    return entities;
}
