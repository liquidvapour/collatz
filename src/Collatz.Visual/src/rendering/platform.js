import { platType } from "../gameLogic/platform";

export const drawPlatforms = (context, platforms) => {
    for (let plat of platforms) {
        if (plat.type == platType.hard) {
            context.fillStyle = "#F48C25";
        } else if (plat.type == platType.end) {
            context.fillStyle = "#448C25";
        }

        if (plat.type == platType.gap) continue;

        const platW = plat.br.x - plat.tl.x;
        const platH = plat.br.y - plat.tl.y;
        context.fillRect(plat.tl.x, plat.tl.y, platW, platH);
    }
};

let cloudsX = 0;
let hillsX = 0;

export const updateBackground = (dt, gameState, canvas) => {
    cloudsX -= dt * gameState.player.velocity.x * 0.005;
    hillsX -= dt * gameState.player.velocity.x * 0.01;

    hillsX = hillsX < -(canvas.width) ? 0 : hillsX;
    cloudsX = cloudsX < -(canvas.width) ? 0 : cloudsX;
};

export const drawBackground = (gc, images, canvas) => {
    const volcano = images.volcano;
    gc.drawImage(volcano, 0, 0, canvas.width, canvas.height);

    const clouds = images.clouds;
    gc.drawImage(clouds, Math.floor(cloudsX), 0, canvas.width, canvas.height);
    gc.drawImage(clouds, Math.floor(cloudsX) + canvas.width, 0, canvas.width, canvas.height);

    const hills = images.hills;
    gc.drawImage(hills, Math.floor(hillsX), 0, canvas.width, canvas.height);
    gc.drawImage(hills, Math.floor(hillsX) + canvas.width, 0, canvas.width, canvas.height);
};