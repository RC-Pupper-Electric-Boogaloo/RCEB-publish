import Matter from "matter-js"
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const Physics = (entities, {time, touches }) => {
    let engine = entities.physics.engine

    // X-akseli muuttuu sormen liikkeen mukaan ja Y-akseli lukittuna ala-laitaan
    touches.filter(t => t.type === 'move').forEach(t => {
        const fingerPositionX = t.event.pageX;
        Matter.Body.setPosition(entities.Char.body, {
            x: fingerPositionX, // sormella voidaan liikuttaa char:ia sivuttain
            y: windowHeight - 70 //nostetaan char:ia ylemmäksi alareunasta
        });
    });

    Matter.Engine.update(engine) // sisältäny time.delta  poistettu  matter-js: Matter.Engine.update: delta argument is recommended to be less than or equal to 16.667 ms. virheen vuoksi

    
    return entities
}

export default Physics