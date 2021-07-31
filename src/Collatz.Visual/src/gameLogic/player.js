import { add } from "../vector2d";
import * as aabb from "../aabb";
import * as vec from '../vector2d';
import { platType } from "./platform";

const jumpingV = { x: 0, y: -17 };

const frameTime = 1000 / 60;

const jumpDelay = frameTime * 15;

const gravity = { x: 0, y: 0.5 };

const maxUpSpeed = -15

const minFlightSpeed = 4;

const maxXV = 15;

const processKeys = (player, keyState, time) => {

    let newVelocity = player.velocity;

    if (keyState.jumpPressed) {
    } else {        
        player.jumping = false;
    }

    return newVelocity;
};

const getAabb = (location, player) => ({
    tl: { x: location.x - (player.size.w / 2), y: location.y - player.size.h },
    br: { x: location.x + (player.size.w / 2), y: location.y }
})


export const update = (player, keyState, platforms, { time }, score) => {

};

export const scoreType = {
    pass: "pass",
    fail: "fail"
};