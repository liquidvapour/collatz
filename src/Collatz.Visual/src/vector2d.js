export const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });

export const multVByS = (v, s) => ({ x: v.x * s, y: v.y * s});

export const length = (x, y) => Math.sqrt(x*x+y*y);