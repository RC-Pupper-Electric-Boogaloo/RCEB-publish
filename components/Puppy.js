import Matter from 'matter-js'
import React from 'react'
import { Image, TouchableOpacity, Alert } from 'react-native'

const Puppy = (props) => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    const handlePress = () => {
        if (props.message) {
            Alert.alert(            
                `${props.name}`,  
                `${props.message}` 
            )
        }
    }

    return (
        <TouchableOpacity
            style={{
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody,
            }}
            onPress={handlePress}
        >
            <Image
                source={props.imageSource}
                style={{
                    width: widthBody,
                    height: heightBody,
                    resizeMode: 'stretch',
                }}
            />
        </TouchableOpacity>
    )
}

export default (world, label, color, pos, size, imageSource, message = null) => {
    const initialPuppy = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: label,
            isStatic: true,
        }
    )
    Matter.World.add(world, initialPuppy)

    return {
        body: initialPuppy,
        color,
        pos,
        imageSource,
        message,
        name: label, 
        renderer: <Puppy body={initialPuppy} imageSource={imageSource} message={message}  name={label} />,
    }
}
