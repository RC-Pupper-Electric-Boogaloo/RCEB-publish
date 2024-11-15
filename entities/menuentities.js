import Matter from "matter-js";
import { Dimensions } from "react-native";
import Backdrop from "../components/Backdrop";


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


export default (restart, imageSource) => { // Huomaa imageSource-parametri
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    world.gravity.y = 0.0;

    return {
        physics: { engine, world },
        Graphic: Backdrop(world, 'Graphic', 'black', { x: windowWidth / 2, y: windowHeight / 2 }, { height: windowHeight, width: windowWidth }, imageSource),
    };
};