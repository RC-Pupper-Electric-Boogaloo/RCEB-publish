import Matter from 'matter-js'
import React from 'react'
import { Image } from 'react-native'

const Backdrop = (props) => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2
    const color = props.color

    return (
        <Image
            source={props.imageSource}
            style={{
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody,
                resizeMode: 'stretch',
                zIndex: -1
            }}
        />
    )
}

export default (world, label, color, pos, size, imageSource) => {
    const initialBackdrop = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label,
            isSensor: true,
            isStatic: true
        }
    )
    Matter.World.add(world, initialBackdrop)

    return {
        body: initialBackdrop,
        color,
        pos,
        imageSource,
        renderer: <Backdrop />
    }
}