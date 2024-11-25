import React from "react";
import { View, Image } from "react-native";
import Matter from "matter-js";

const Battery = (props) => {
    const width = props.size.width;
    const height = props.size.height;
    const x = props.body.position.x - width / 5;
    const y = props.body.position.y - height / 5;

    return (
        <Image 
            source={props.image} 
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
            }}
        />
    );
};

export default (world, label, color, position, size, image) => {
    const initialBattery = Matter.Bodies.rectangle(
        position.x,
        position.y,
        size.width,
        size.height,
        { label }
    );
    Matter.World.add(world, initialBattery);

    return {
        body: initialBattery,
        color,
        size,
        image,
        renderer: <Battery />,
    };
};
