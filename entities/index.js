import Matter from "matter-js"
import Char from "../Components/Char"
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const initialCharPositionX = windowWidth / 2;
const initialCharPositionY = windowHeight - 30

export default restart => {
    let engine = Matter.Engine.create({enableSleeping: false})

    let world = engine.world

    world.gravity.y = 0 // muutettu 0.4-->0 jottei char komponentti tipu ruudula

    return{
        physics: {engine, world},
        Char: Char(world, 'red', { x: initialCharPositionX, y: initialCharPositionY }, { height: 40, width: 40 })
    }
}