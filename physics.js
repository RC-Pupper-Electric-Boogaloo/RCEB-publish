import Matter from "matter-js";
import { Dimensions } from "react-native";
import { getRandom } from "./utils/random";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Tuodaan AsyncStorage

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Physics = (entities, { time, touches, dispatch }) => {
    let engine = entities.physics.engine;
    let world = engine.world;
    let points = 0;
    let coinCount = entities.coinCount || 0; 

    touches.filter(t => t.type === "move").forEach(t => {
        const fingerPositionX = t.event.pageX;

        Matter.Body.setPosition(entities.Char.body, {
            x: fingerPositionX,
            y: entities.Char.body.position.y 
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

    if (entities["Coin"] && entities["Coin"].body.bounds.min.y >= windowHeight) {
        Matter.Body.setVelocity(entities["Coin"].body, { x: 0, y: 0 });
        Matter.Body.setPosition(entities["Coin"].body, {
            x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2), 
            y: getRandom(10, 20) * -windowHeight
        });
    }

    if (entities["Obstacle"] && entities["Obstacle"].body.bounds.min.y >= windowHeight) {
        Matter.Body.setVelocity(entities["Obstacle"].body, { x: 0, y: 0 });
        Matter.Body.setPosition(entities["Obstacle"].body, {
            x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2), 
            y: -windowHeight * 1.5
        });
    }

    if (entities["Choco"] && entities["Choco"].body.bounds.min.y >= windowHeight) {
        Matter.Body.setVelocity(entities["Choco"].body, { x: 0, y: 0 });
        Matter.Body.setPosition(entities["Choco"].body, {
            x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2), 
            y: -windowHeight * 2
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
                    if (points % 5 === 0) {
                        world.gravity.y = world.gravity.y + 0.1;
                    }
                    dispatch({ type: "new_point" });
                    Matter.Body.setVelocity(entities["Point"].body, { x: 0, y: 0 });
                    Matter.Body.setPosition(bodyB, {
                        x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2), 
                        y: -50
                    });

                } else if (bodyA.label === "Char" && bodyB.label === "Coin") {
                    // Kolikon kerääminen
                    coinCount++;
                    dispatch({ type: "coin_collected" });

                    // Tallennetaan kolikon määrä AsyncStorageiin
                    //AsyncStorage.setItem('coinCount', JSON.stringify(coinCount)); // tää ei voi toimia näin, tuossa pitäisi ensin hakea kolikkojen määrä ja lisätä nämä siihen, tai viedä ne storageen vasta kun peli on ohi

                    Matter.Body.setVelocity(entities["Coin"].body, { x: 0, y: 0 });
                    Matter.Body.setPosition(entities["Coin"].body, {
                        x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2), 
                        y: getRandom(10, 20) * -windowHeight
                    });

                } else if (bodyA.label === "Point" && bodyB.label === "Obstacle") {
                    Matter.Body.setVelocity(entities["Obstacle"].body, { x: 0, y: 0 });
                    Matter.Body.setPosition(bodyB, {
                        x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2), 
                        y: -windowHeight * 3
                    });
                } else if (bodyA.label === "Char" && bodyB.label === "Choco") {
                    dispatch({ type: "miss" });
                    if (world.gravity.y > 0.4) {
                        world.gravity.y = world.gravity.y - 0.1;
                    }
                    Matter.Body.setVelocity(entities["Choco"].body, { x: 0, y: 0 });
                    Matter.Body.setPosition(bodyB, {
                        x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2), 
                        y: -50
                    });
                } else if (bodyA.label === "Char" && bodyB.label === "Obstacle") {
                    // Lähetä "game_over"-tapahtuma
                    dispatch({ type: "game_over" });
                }
            });
        });
    }

    // Lähetetään kolikkolaskuri takaisin entiteetteihin
    return {
        ...entities,
        coinCount // Lähetetään coinCount entiteetiksi
    };
};

export default Physics;
