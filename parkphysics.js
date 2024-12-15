import Matter from "matter-js"
import { Dimensions, Alert } from "react-native"
import { getRandom } from "./utils/random"

const windowHeight = Dimensions.get("window").height
const windowWidth = Dimensions.get("window").width
const FIXED_SPEED = 2

const updateBatteryLevel = (currentLevel, increment) => {
    let newBatteryLevel = Math.min(currentLevel + increment, 100)
    console.log("Battery Level after pet:", newBatteryLevel);
    return newBatteryLevel
}

const Physics = (entities, { time, touches, dispatch }) => {
    let engine = entities.physics.engine
    let world = engine.world

    if (!entities.batteryLevel) {
        entities.batteryLevel = 0
    }
    let batteryLevel = entities.batteryLevel || 0

    if (entities.events && entities.events.length > 0) {
        entities.events.forEach((event) => {
            if (event.type === 'move_treat') {
                // Move Treat to a random location
                Matter.Body.setPosition(entities["Treat"].body, {
                    x: getRandom(windowWidth * 0.1, windowWidth * 0.9),
                    y: getRandom(windowHeight * 0.1, windowHeight * 0.9),
                });
            }
        });
        // Clear events after handling them
        entities.events = [];
    }

    touches.filter(t => t.type === "press").forEach(async t => {
        const touchX = t.event.pageX
        const touchY = t.event.pageY

        if (entities["Char"]) {
            const pet = entities["Char"]
            const { min, max } = pet.body.bounds
            
            if (
                touchX >= min.x && touchX <= max.x &&
                touchY >= min.y && touchY <= max.y
            ) {
                Matter.Body.setVelocity(entities["Char"].body, {
                    x: getRandom(-3,3),
                    y: getRandom(-3,3),
                })
                const charPosition = entities["Char"].body.position
                Matter.Body.setPosition(entities["Heart"].body, {
                    x: charPosition.x,
                    y: charPosition.y,
                })
                batteryLevel = updateBatteryLevel(batteryLevel, 1);
                entities.batteryLevel = batteryLevel;
                console.log("Battery Level after pet:", batteryLevel);

                if (batteryLevel >= 100){
                    Matter.Body.setPosition(entities["Char"].body, {
                        x: windowWidth * 2,
                        y: windowHeight * 2,
                    })
                    Matter.Body.setVelocity(entities["Char"].body, {
                        x: 0,
                        y: 0,
                    })
                    Matter.Body.setPosition(entities["Treasure"].body, {
                        x: getRandom( windowWidth * 0.15, windowWidth * 0.80),
                        y: getRandom( windowHeight * 0.65, windowHeight * 0.85),
                    })
                    Alert.alert("Pupper wags it's tail",'Pupper leaves a treasure as thank you')
                }
                dispatch({ type: "petted", level: batteryLevel })
            }
        }

        if (entities["Treat"]) {
            const Treat = entities["Treat"]
            const { min, max } = Treat.body.bounds
            
            if (
                touchX >= min.x && touchX <= max.x &&
                touchY >= min.y && touchY <= max.y
            ) {
                Matter.Body.setPosition(entities["Treat"].body, {
                    x: getRandom( windowWidth * 0.15, windowWidth * 0.80),
                    y: getRandom( windowHeight * 0.65, windowHeight * 0.85),
                })
            }
        }

        if (entities["Treasure"]) {
            const Treasure = entities["Treasure"]
            const { min, max } = Treasure.body.bounds
            
            if (
                touchX >= min.x && touchX <= max.x &&
                touchY >= min.y && touchY <= max.y
            ) {
                Matter.Body.setPosition(entities["Treasure"].body, {
                    x: windowWidth * 2,
                    y: windowHeight * 2,
                })
                                            
                dispatch({ type: "game_over" })
            }
        }
    })


    if (!engine.collisionHandler) {
        engine.collisionHandler = Matter.Events.on(engine, "collisionStart", (event) => {
            event.pairs.forEach(({ bodyA, bodyB }) => {
                if (bodyA.label === "Char" && bodyB.label === "Wall") {
                    // Get current velocity of Char
                    const currentVelocity = entities["Char"].body.velocity

                    // Invert velocity on collision
                    Matter.Body.setVelocity(entities["Char"].body, {
                        x: currentVelocity.x * -1,
                        y: currentVelocity.y * -1,
                    })
                }
                if (bodyA.label === "Treat" && bodyB.label === "Char" || bodyB.label === "Treat" && bodyA.label === "Char") {
                    Matter.Body.setVelocity(entities["Treat"].body, {
                        x: 0,
                        y: 0,
                    })
                    Alert.alert("Yummy",'Pupper is super happy')


                    Matter.Body.setPosition(entities["Treat"].body, {
                        x: windowWidth * 0.85 + 20,
                        y: windowHeight * 0.60 / 2 + 20,
                    })
                    Matter.Body.setVelocity(entities["Treat"].body, {
                        x: 0,
                        y: 0,
                    })  
                    dispatch({ type: "treat_collected" })
                }
            })
        })
    }

    const maintainConstantVelocity = (body) => {
        let velocity = body.velocity;

        const magnitude = Math.sqrt(velocity.x ** 2 + velocity.y ** 2)
        if (magnitude > 0) {
            const normalizedX = velocity.x / magnitude
            const normalizedY = velocity.y / magnitude

            Matter.Body.setVelocity(body, {
                x: normalizedX * FIXED_SPEED,
                y: normalizedY * FIXED_SPEED,
            });
        } else {
            const randomX = Math.random() > 0.5 ? 1 : -1
            const randomY = Math.random() > 0.5 ? 1 : -1

            Matter.Body.setVelocity(body, {
                x: randomX * FIXED_SPEED,
                y: randomY * FIXED_SPEED,
            });
        }
    };

    maintainConstantVelocity(entities["Char"].body);
    Matter.Engine.update(engine)
    
    return {
        ...entities,
        batteryLevel
    }
}

export default Physics
