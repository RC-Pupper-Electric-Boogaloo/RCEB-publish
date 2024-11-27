import { Dimensions } from "react-native"

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max -min +1) + min)
}