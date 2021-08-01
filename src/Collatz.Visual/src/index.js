import { startKeyboard } from "./keyboard";
import * as playerLogic from "./gameLogic/player";
import { createPlayer } from "./rendering/player";
import { updateBackground } from "./rendering/platform";
import { createCamera, updateCamera} from "./camera";
import * as vector2d from "./vector2d";
import * as startScreen from "./startScreen";
import * as collatzTree from "./rendering/collatzTree";


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
    let player = createPlayer();
    const collatz = collatzTree.create();

    const canvas = doc.getElementById("canvas");
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
        collatz,
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

const drawGame = (canvas, gameState) => {
    const gc = canvas.getContext("2d", { alpha: false });
    gc.save();
    gc.fillStyle = "#5B5B5B";
    gc.fillRect(0, 0, canvas.width, canvas.height);
    //drawBackground(gc, images, canvas);
    //gc.translate(gameState.camera.x, gameState.camera.y);
    collatzTree.draw(gc, gameState.collatz);
    //drawPlayer(gc, gameState.player, images);
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
