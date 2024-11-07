import Matter from "matter-js";
import { Dimensions } from "react-native";
import { getRandom } from "./utils/random";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Physics = (entities, { time, touches, dispatch }) => {
    let engine = entities.physics.engine;

    touches.filter(t => t.type === "move").forEach(t => {
        const fingerPositionX = t.event.pageX;

        Matter.Body.setPosition(entities.Char.body, {
            x: fingerPositionX,
            y: windowHeight - 30
        });
    });

    Matter.Engine.update(engine);

    if (!engine.collisionHandler) {
        engine.collisionHandler = Matter.Events.on(engine, "collisionStart", (event) => {
            event.pairs.forEach(({ bodyA, bodyB }) => {
                if (bodyA.label === "Char" && bodyB.label === "Point") {
                    
                    dispatch({ type: "new_point" });

                    Matter.Body.setPosition(bodyB, {
                        x: getRandom(10, windowWidth-10),
                        y: -50 
                    });
                } else if (bodyA.label === "Char" && bodyB.label === "Obstacle") {
                    // Lähetä "game_over"-tapahtuma
                    dispatch({ type: "game_over" });
                }
                
            });
        });
    }
    
    return entities;
};

export default Physics;
