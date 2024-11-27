import Matter from "matter-js";
import { Dimensions } from "react-native";
import { getRandom } from "./utils/random";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Physics = (entities, { time, touches, dispatch }) => {
    let engine = entities.physics.engine;
    let world = engine.world;
    let points = 0;

    touches.filter(t => t.type === "move").forEach(t => {
        const fingerPositionX = t.event.pageX;

        Matter.Body.setPosition(entities.Char.body, {
            x: fingerPositionX,
            y: windowHeight - 30
        });
    });

    Matter.Engine.update(engine);
    
    if (entities["Point"] && entities["Point"].body.bounds.min.y >= windowHeight) {
        Matter.Body.setVelocity(entities["Point"].body, { x: 0, y: 0 });
        Matter.Body.setPosition(entities["Point"].body, {
            x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2), 
            y: -50
        });
    }
    if (entities["Obstacle"] && entities["Obstacle"].body.bounds.min.y >= windowHeight) {
        Matter.Body.setVelocity(entities["Obstacle"].body, { x: 0, y: 0 });
        Matter.Body.setPosition(entities["Obstacle"].body, {
            x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2), 
            y: -50
        });
    }
    if (entities["Backdrop"] && entities["Backdrop"].body.bounds.max.y >= windowHeight + windowHeight) {
        Matter.Body.setPosition(entities["Backdrop"].body, {
            x: windowWidth / 2,
            y: 0
        });
    }

    if (!engine.collisionHandler) {
        engine.collisionHandler = Matter.Events.on(engine, "collisionStart", (event) => {
            event.pairs.forEach(({ bodyA, bodyB }) => {
                if (bodyA.label === "Char" && bodyB.label === "Point") {
                    points++;
                    if (points % 10 === 0) {
                        world.gravity.y = world.gravity.y*1.3;
                    }
                    dispatch({ type: "new_point" });
                    Matter.Body.setVelocity(entities["Point"].body, { x: 0, y: 0 });
                    Matter.Body.setPosition(bodyB, {
                        x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2), 
                        y: -50
                    });
                   
                } else if (bodyA.label === "Point" && bodyB.label === "Obstacle") {
                    Matter.Body.setVelocity(entities["Obstacle"].body, { x: 0, y: 0 });
                    Matter.Body.setPosition(bodyB, {
                        x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2), 
                        y: -150
                    });
                }else if (bodyA.label === "Char" && bodyB.label === "Obstacle") {
                    // Lähetä "game_over"-tapahtuma
                    dispatch({ type: "game_over" });
                }

            });
        });
    }

    
    return entities;
};

export default Physics;