import Matter from "matter-js"
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const Physics = (entities, {time, touches }) => {
    let engine = entities.physics.engine

    // Y-akseli lukittuna alalaitaan ja X-akseli muuttuu sormen kosketuksen mukaan
    touches.filter(t => t.type === 'move').forEach(t => {
        const fingerPositionX = t.event.pageX;

        // X-akseli muuttuu sormen liikkeen mukaan ja Y-akseli lukittuna ala-laitaan
        Matter.Body.setPosition(entities.Char.body, {
            x: fingerPositionX,
            y: windowHeight - 30 
        });
    });

    Matter.Engine.update(engine) // sisältäny time.delta  poistettu  matter-js: Matter.Engine.update: delta argument is recommended to be less than or equal to 16.667 ms. virheen vuoksi

    
    return entities
}

export default Physics