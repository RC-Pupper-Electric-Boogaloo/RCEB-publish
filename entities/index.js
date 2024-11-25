import Matter from "matter-js";
import Char from "../components/Char";
import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";
import Point from "../components/Point";
import Wall from "../components/Wall";
import Backdrop from "../components/Backdrop";
import Coin from "../components/Coin";
import Battery from "../components/Battery";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const initialCharPositionX = windowWidth / 2; 
const initialCharPositionY = windowHeight - (windowHeight * 0.1);

const charSize = windowWidth / 4;
const obstacleSize = windowWidth / 5;
const pointSize = windowWidth / 5;
const coinSize = windowWidth / 7;
const batterySize = windowWidth / 8; 

export default (restart, imageSource, skin) => {
    let engine = Matter.Engine.create({ enableSleeping: false });

    let world = engine.world;

    world.gravity.y = 0.4;

    return {
        physics: { engine, world },
        Backdrop: Backdrop(world, 'Backdrop', 'black', { x: windowWidth / 2, y: (windowHeight / 2) * 1.3 }, { height: windowHeight, width: windowWidth }, imageSource),
        Char: Char(world, 'Char', 'red', { x: initialCharPositionX, y: initialCharPositionY }, { height: charSize, width: charSize }, skin),
        Obstacle: Obstacle(world, 'Obstacle', 'black', { x: 60, y: -50 }, { height: obstacleSize, width: obstacleSize }, require('../assets/Cat.png')),
        Choco: Obstacle(world, 'Choco', 'black', { x: 160, y: -150 }, { height: obstacleSize, width: obstacleSize }, require('../assets/Choco.png')),
        Point: Point(world, 'orange', { x: 260, y: -50 }, { height: pointSize, width: pointSize }, require('../assets/Point.png')),
        Coin: Coin(world, 'gold', { x: 260, y: -5 * windowHeight }, { height: coinSize, width: coinSize }, require('../assets/Coin.png')),
        Battery: Battery(world, 'Battery', 'blue', { x: 360, y: -300 }, { height: batterySize, width: batterySize }, require('../assets/Battery.png')), 
    };
};
