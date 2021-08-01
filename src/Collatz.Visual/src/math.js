import lerp from "@sunify/lerp-color";
// Precise method, which guarantees v = v1 when t = 1.
export const lerpInt = (v0, v1, t) => (1 - t) * v0 + t * v1;

export const randomBetween = (min, max) => (Math.random() * (max - min)) + min;

export const randomColor = () => { 
    return lerp('#3D0E4F', '#A139C6', Math.random()); 
    //return `rgb(${randomBetween(0, 255)},${randomBetween(0, 255)},${randomBetween(0, 255)})`
};

export const degToRad = (deg) => deg * Math.PI / 180;
