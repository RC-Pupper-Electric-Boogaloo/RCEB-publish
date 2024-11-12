import React from "react"
import Matter from 'matter-js'
import { View, Image } from 'react-native'

const Char = (props) => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2


    return (
        <Image
            source={require('../assets/Char.png')}
            style={{
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody,
                resizeMode: 'stretch',
            }}
        />
    )
}

export default (world, color, pos, size) => {
    const initialChar = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: 'Char',
            isStatic: true
        }
    );
    Matter.World.add(world, initialChar);

    return {
        body: initialChar,
        color,
        pos,
        renderer: <Char />
    }
}