const collision = (a, b) => a.tl.x < b.br.x && a.br.x > b.tl.x && a.tl.y < b.br.y && a.br.y > b.tl.y;

const passing = (a, b) => a.tl.x < b.br.x && a.br.x > b.tl.x;

const inside = (a, b) => a.tl.y < b.br.y && a.br.y > b.tl.y;

const collidedWithFloor = (newLocationAabb, currentLocationAabb, plat) =>
    currentLocationAabb.br.y <= plat.tl.y && newLocationAabb.br.y > plat.tl.y;

const collidedWithWallOnRight = (newLocationAabb, currentLocationAabb, plat) =>
    currentLocationAabb.br.x <= plat.tl.x && newLocationAabb.br.x > plat.tl.x

const collidedWithWallOnLeft = (newLocationAabb, currentLocationAabb, plat) =>
    currentLocationAabb.tl.x >= plat.br.x && newLocationAabb.tl.x < plat.br.x

const collidedWithWallOnTop = (newLocationAabb, currentLocationAabb, plat) =>
    currentLocationAabb.tl.y >= plat.br.y && newLocationAabb.tl.y < plat.br.y;

export {
    collision,
    collidedWithFloor,
    collidedWithWallOnLeft,
    collidedWithWallOnRight,
    collidedWithWallOnTop,
    passing,
    inside
};