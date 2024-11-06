import React from "react"
import Matter from 'matter-js'
import { View } from "react-native"

const Char = (props) => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const xBody = props.body.position.x - widthBody / 2 
    const yBody = props.body.position.y - heightBody / 2 


    return (
        <View
          style={{
            borderWidth: 1,
            borderColor: props.color,
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
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
        { label: 'Char' }
    );
    Matter.World.add(world, initialChar);

    return {
        body: initialChar,
        color,
        pos,
        renderer: <Char/>
    }
}