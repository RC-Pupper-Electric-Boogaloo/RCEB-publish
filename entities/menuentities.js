import Matter from "matter-js";
import { Dimensions } from "react-native";
import { getRandom } from "../utils/random";
import Backdrop from "../components/Backdrop";
import Sprites from "../components/Sprites";



const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


export default (restart, imageSource) => { 
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    world.gravity.y = 0;
    world.gravity.x = -0.02;

    return {
        physics: { engine, world },
        Graphic: Backdrop(world, 'Graphic', 'black', { x: windowWidth / 2, y: windowHeight / 2 }, { height: windowHeight, width: windowWidth }, imageSource),       
        Cloud1: Sprites(world, 'Cloud1', 'black',  { x: windowWidth +50, y: getRandom(150, windowHeight / 1.1)}, { height: 160, width: 160 }, require('../assets/cloudcouble.png')),
        Cloud2: Sprites(world, 'Cloud2', 'black',  { x: windowWidth -20, y: getRandom(150, windowHeight / 1.1)}, { height: 50, width: 100 }, require('../assets/cloudSingle.png')),
    };
};