import Matter from "matter-js"
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const Physics = (entities, { time }) => {
    let engine = entities.physics.engine

    Matter.Engine.update(engine, time.delta)

    
    return entities
}

export default Physics