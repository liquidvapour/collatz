 // Precise method, which guarantees v = v1 when t = 1.
 export const lerp = (v0, v1, t) => {
  return (1 - t) * v0 + t * v1;
};

export const randomBetween = (min, max) => (Math.random() * (max - min)) + min;
