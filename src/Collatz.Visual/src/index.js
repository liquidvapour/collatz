import { startKeyboard } from "./keyboard";
import * as playerLogic from "./gameLogic/player";
import { drawPlayer, createPlayer } from "./rendering/player";
import { drawPlatforms, drawBackground, updateBackground } from "./rendering/platform";
import { createCamera, updateCamera} from "./camera";
import * as vector2d from "./vector2d";
import { platType } from "./gameLogic/platform";
import * as startScreen from "./startScreen";

const vecToString = s => `x: ${s.x.toFixed(2)}, y: ${s.y.toFixed(2)}`;

const getMovementStats = (s) => `v: ${
    vector2d.length(s.player.velocity.x, s.player.velocity.y).toFixed(2)
}; ${vecToString(s.player.velocity)}`;

//const getLocationStats = player => vecToString(player.location);

const drawStats = (ctx, s) => {
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = '20px sans-serif';
    ctx.fillText(getMovementStats(s), 0, 40);
    ctx.fillText(curScore, 0, 80);
    ctx.fillText(`frame: ${s.player.frame}`, 0,  120);
    ctx.restore();
}; 

const startUp = (doc) => {
    const canvas = doc.getElementById("canvas");
    let player = createPlayer();
    const imagesDiv = doc.getElementById("images");

    const images = {};

    for (let i = 0; i < imagesDiv.children.length; i++) {
        images[imagesDiv.children[i].id] = imagesDiv.children[i]; 
    }

    const keyState = startKeyboard(doc);

    const camera = createCamera(canvas);

    player.location.x += 600;
    player.velocity.x = 4;

    const context = {
        player,
        camera,
        platforms: createPlatforms(),
        keyState
    }

    const render = () =>
        draw(canvas, images, context, () => window.requestAnimationFrame(render));

    if (images["space-button"].complete) {
        render();
    }
    else {
        images["space-button"].addEventListener("load", render);
    }
};

const platSpacing = 450;
const platWidth = 60;

const randomBetween = (min, max) => (Math.random() * (max - min)) + min;

const createPlatBottom = (x, offset) => ({
    tl: {x: x * platSpacing, y: 50 + offset },
    br: {x: x * platSpacing + platWidth, y: 1000},
    type: platType.hard
});

const createPlatTop = (x, offset) => ({
    tl: {x: x * platSpacing, y: -1000 },
    br: {x: x * platSpacing + platWidth, y: -180 + offset },
    type: platType.hard
});

const createGapPlat = (topPlat, bottomPlat) => ({
    tl: { x: topPlat.tl.x, y: topPlat.br.y },
    br: { x: bottomPlat.br.x, y: bottomPlat.tl.y },
    type: platType.gap
});

const createEndPlat = (x) => ({
    tl: { x: x * platSpacing, y: -1000 },
    br: { x: x * platSpacing + platWidth, y: 1000 },
    type: platType.end
});

const createPlatforms = () => {
    const matPlats = 10;
    const platforms = [];
    for (let i = 0; i < matPlats; i++) {
        const offset = randomBetween(0, 250);
        const bottomPlat = createPlatBottom(i, offset);
        const topPlat = createPlatTop(i, offset);
        platforms.push(topPlat);
        platforms.push(bottomPlat);
        platforms.push(createGapPlat(topPlat, bottomPlat));
    }
    platforms.push(createEndPlat(matPlats + 1));
    return platforms;
};

let lastFrameTime = 0;

const getTime = () => {
    const time = performance.now();
    if (lastFrameTime === 0) {
        lastFrameTime = time - 16.66666666667;
    } 

    const dt = time - lastFrameTime;
    lastFrameTime = time;
    return { dt, time };
};

let curState = "start";

const inGameUpdate = (t, gameState, canvas) => {
    playerLogic.update(gameState.player, gameState.keyState, gameState.platforms, t, score);

    updateCamera(gameState.camera, gameState.player, t.time);
    updateBackground(t.dt, gameState, canvas);
    return "game";
};

const drawGame = (canvas, gameState, images) => {
    const gc = canvas.getContext("2d", { alpha: false });
    gc.save();
    gc.fillStyle = "#5B5B5B";
    gc.fillRect(0, 0, canvas.width, canvas.height);
    drawBackground(gc, images, canvas);
    gc.translate(gameState.camera.x, gameState.camera.y);
    drawPlatforms(gc, gameState.platforms);
    drawPlayer(gc, gameState.player, images);
    gc.restore();
    drawStats(gc, gameState);
    
};

const draw = (canvas, images, gameState, requestFrame) => {
    const t = getTime();

    switch (curState)
    {
        case "game":
            curState = inGameUpdate(t, gameState, canvas);
            drawGame(canvas, gameState, images);
            break;
        default:
            curState = startScreen.updateStart(t, gameState);
            startScreen.drawStart(canvas, gameState, images);
    }
 
    requestFrame();
};

let curScore = 0;

const score = (state) => {
    if (state === playerLogic.scoreType.pass) {
        curScore += 100;
    }
};

startUp(document);
