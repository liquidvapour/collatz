 // Precise method, which guarantees v = v1 when t = 1.
 export const lerp = (v0, v1, t) => (1 - t) * v0 + t * v1;

export const randomBetween = (min, max) => (Math.random() * (max - min)) + min;

export const randomColor = () => `rgb(${randomBetween(0, 255)},${randomBetween(0, 255)},${randomBetween(0, 255)})`;

export const degToRad = (deg) => deg * Math.PI / 180;
