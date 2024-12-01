import Matter from "matter-js"
import Char from "../components/Char"
import { Dimensions } from "react-native"
import Obstacle from "../components/Obstacle"
import Point from "../components/Point"
import Backdrop from "../components/Backdrop"
import Sprites from "../components/Sprites"

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
const initialCharPositionX = windowWidth / 2
const initialCharPositionY = windowHeight - (windowHeight * 0.1)

const charSize = windowWidth / 4
const obstacleSize = windowWidth / 5
const pointSize = windowWidth / 5
const coinSize = windowWidth / 7
const batterySize = windowWidth / 8

export default (restart, imageSource, skin) => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    world.gravity.y = 0.4;

    let entities = {
        physics: { engine, world },
        Backdrop: Backdrop(world, 'Backdrop', 'black', { x: windowWidth / 2, y: (windowHeight / 2) * 1.3 }, { height: windowHeight, width: windowWidth }, imageSource),
        Rainbow: Sprites(world, 'Rainbow', 'black',  { x: windowWidth / 2, y: windowHeight }, { height: 100, width: windowWidth }, require('../assets/rainbow.png')),
        Char: Char(world, 'Char', 'red', { x: initialCharPositionX, y: initialCharPositionY }, { height: charSize, width: charSize }, skin),
        Obstacle: Obstacle(world, 'Obstacle', 'black', { x: 60, y: -50 }, { height: obstacleSize, width: obstacleSize }, require('../assets/Cat.png')),
        Choco: Obstacle(world, 'Choco', 'black', { x: 160, y: -150 }, { height: obstacleSize, width: obstacleSize }, require('../assets/Choco.png')),
        Battery: Obstacle(world, 'Battery', 'blue', { x: 360, y: -5 * windowHeight }, { height: batterySize, width: batterySize }, require('../assets/Battery.png')),
        Point: Point(world, 'Point', 'orange', { x: 260, y: -50 }, { width: pointSize }, require('../assets/Point.png')),
        Coin: Point(world, 'Coin', 'gold', { x: 260, y: -5 * windowHeight }, { width: coinSize }, require('../assets/Coin.png')),
        Coin1: Point(world, 'Coin1', 'gold', { x: -100, y: -1000 }, { width: coinSize }, require('../assets/Coin.png')),
        Coin2: Point(world, 'Coin2', 'gold', { x: -200, y: -1200 }, { width: coinSize }, require('../assets/Coin.png')),
        Coin3: Point(world, 'Coin3', 'gold', { x: -300, y: -1400 }, { width: coinSize }, require('../assets/Coin.png')),
        Coin4: Point(world, 'Coin4', 'gold', { x: -100, y: -1000 }, { width: coinSize }, require('../assets/Coin.png')),
  }

    return entities;
};
