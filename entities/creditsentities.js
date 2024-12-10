import Matter from "matter-js";
import { Dimensions } from "react-native";
import { getRandom } from "../utils/random";
import Backdrop from "../components/Backdrop";
import Sprites from "../components/Sprites";
import Puppy from "../components/Puppy";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const fetchPurchasedSkins = async () => {
    const savedSkins = await AsyncStorage.getItem("purchasedSkins");
    return savedSkins ? JSON.parse(savedSkins) : [];
};

export default async (restart, imageSource) => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    world.gravity.y = 0;
    world.gravity.x = -0.02;

    const purchasedSkins = await fetchPurchasedSkins();

    const allEntities = [
        { id: 18, name: "OG RC Pupper", source: require("../assets/rcPupperOg.png"), x: 0.85, y: 0.72, message: "Blast from the past! The Original RC Puppy didn't ride a remote-controlled car—no, no, no. It was the remote-controlled Puppy, full of electric boogaloo. Classic mode offers a glimpse of how things could have been." },
        { id: 10, name: "Pirate Corgi", source: require("../assets/rcPiratePup.png"), x: 0.15, y: 0.75, message: "Hide your bones! This greedy Corgi takes them all. Rumor has it this puppy has already collected over 10,000 of them—just look at that full sack!" },
        { id: 6, name: "Business Borzoi", source: require("../assets/rcBusinessBorzoi.png"), x: 0.45, y: 0.75, message: "Why the long face? Business Borzoi has his snout deep in work. At least the commute goes fast with brand new remote-controlled car." },
        { id: 15, name: "Win Whippet", source: require("../assets/rcWinWhippet.png"), x: 0.75, y: 0.75, message: "This puppy just can't stop winning! A medal hangs proudly around its neck, proving to other puppies that it's the best. Hitting speeds of 60 mph without a remote-controlled car—and going even faster with one—nobody can catch this speedster. Whip it, Win Whippet!" },
        { id: 5, name: "Professor Poodle", source: require("../assets/rcProfPoodle.png"), x: 0.25, y: 0.78, message: "Who's the smart puppy? You are! As clever as they are cute, this sharp fluffball knows everything about remote-controlled cars. No stinking cat can outsmart this Poodle!" },
        { id: 2, name: "ShopDog", source: require("../assets/rcShopDog.png"), x: 0.55, y: 0.78, message: "Shopkeeper wants to join the fun! How boring would it be to just run the Puppy Pawn Shop? This puppy can collect coins as well as count them!" },
        { id: 11, name: "Bonus Pupper", source: require("../assets/rcBonusPuppy.png"), x: 0.1, y: 0.81, message: "You get a pupper, and you get a pupper! What's better than one pupper? Another pupper as a bonus! This feisty little Chihuahua knows how to throw a party!" },
        { id: 8, name: "Golden Puppy", source: require("../assets/rcGentlePuppy.png"), x: 0.4, y: 0.81, message: "Who do you call when gold needs retrieving? This Golden Puppy is a true gentleman. With aristocratic charm, this Golden Retriever puppy shines like 10,000 golden coins. You've been through some bonus modes to unlock this fella, haven't you?" },
        { id: 13, name: "Merchant Beagle", source: require("../assets/rcMeclarBeagle.png"), x: 0.7, y: 0.81, message: "It's the trade that's worth it! Once this Merchant notarized every puppy adoption at the Puppy Pawn Shop, what else was there to do but join the fun? Merchant Beagle can do so much more than just trading!" },
        { id: 7, name: "Maurice 'Puglife' Pupper", source: require("../assets/rcPugLifePupper.png"), x: 0.2, y: 0.84, message: "It's just a puglife, yo! Maurice knows how to get around in style. This pug has embraced the puglife and has the street smarts to avoid surprise jumps from cats—even those bonus coins turning back to cats--trying to trip you up!" },
        { id: 12, name: "Sergeant Woofer", source: require("../assets/rcSgtWoofer.png"), x: 0.5, y: 0.84, message: "Master of disguise! How did you even find Woofer? This fluffy Lapland dog can camouflage anywhere. Can you even see the Sergeant? Cats sure can't!" },
        { id: 1, name: "Doc Dog", source: require("../assets/rcDocDog.png"), x: 0.85, y: 0.84, message: "The doctor is in! Do these statistics look healthy? At least they're showing steady growth. Nobody's scared to see this cute little fella!" },
        { id: 9, name: "Timekeeper Dachshund", source: require("../assets/rcTimeKeeper.png"), x: 0.35, y: 0.87, message: "Wasting time has never been so rewarding! This adorable Dachshund puppy is a clocksmith and tinkerer of time. Boy, does time fly while dodging cats! It took an eternity in dog years to get the Timekeeper to join, so why not spend another one with this pupper?" },
        { id: 3, name: "Silken Engineer", source: require("../assets/rcSilkeneer.png"), x: 0.67, y: 0.87, message: "Who keeps the options working? Silken Engineer, of course! This puppy can even flip the switch and remove all progress—if you wish." },
        { id: 0, name: "RC Puppy", source: require("../assets/CharDog.png"), x: 0.48, y: 0.9, message: "Take the controller and hop on an RC car! This pupper uses mad steering skills to gather bones and coins while looking adorable. Why run when you can ride in style?" },
        { id: 4, name: "Saint Bernard", source: require("../assets/rcBreakBernard.png"), x: 0.83, y: 0.89, message: "Need a break? Saint Bernard's got you covered with a keg full of warm cocoa! This lovable pup knows how to keep things cozy and relaxed, ensuring you take a well-deserved pause. Just don't forget the marshmallows!" },
        { id: 9, name: "Fluffers", source: require("../assets/rcFluffers.png"), x: 0.15, y: 0.89, message: "Who's buried in the snow with only a nose poking out? Fluffers!!! This ultra-fluffy pup might get lost in a snowdrift, but don't worry—it always comes back for a cozy cuddle. Just keep an eye on that fluffy tail!" },
        { id: 3, name: "Crash Buldog", source: require("../assets/rcCrashBuldog.png"), x: 0.64, y: 0.92, message: "Crash Bulldog is the ultimate testament to persistence! Did a cat jump scare you? No problem—just keep going. RC car malfunction? Brush it off and try again. This bulldog never backs down, and neither should you!" },
        { id: 0, name: "Power Puppy Pampai", source: require("../assets/rcPowerPuppy.png"), x: 0.27, y: 0.92, message: "Is it a plane? Is it a bird? No—it's Power Puppy Pampai soaring through the air for a treat! With boundless energy and jumps that defy gravity, Power Puppy's here to show you how high a pup can fly. Time to play in style!" },
    ];

    const purchasedEntities = allEntities.filter(entity => purchasedSkins.includes(entity.id));

    const entities = purchasedEntities.reduce((acc, entity) => {
        acc[entity.name] = Puppy(
            world,
            entity.name,
            "black",
            { x: windowWidth * entity.x, y: windowHeight * entity.y },
            { height: windowWidth * 0.3, width: windowWidth * 0.3 },
            entity.source,
            entity.message
        );
        return acc;
    }, {});

    return {
        physics: { engine, world },
        Graphic: Backdrop(world, 'Graphic', 'black', { x: windowWidth / 2, y: windowHeight / 2 +31 }, { height: windowHeight, width: windowWidth }, imageSource),
        Cloud1: Sprites(world, 'Cloud1', 'black',  { x: windowWidth +50, y: getRandom(150, windowHeight / 1.1)}, { height: 160, width: 160 }, require('../assets/cloudcouble.png')),
        Cloud2: Sprites(world, 'Cloud2', 'black',  { x: windowWidth -20, y: getRandom(150, windowHeight / 1.1)}, { height: 50, width: 100 }, require('../assets/cloudSingle.png')),
        ...entities,
    };
};