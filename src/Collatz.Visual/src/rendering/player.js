const drawLine = (ctx, ax, ay, bx, by) => {
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 2;
    ctx.stroke();
};


const cellWith = 64;

const drawPlayerImg = (ctx, player, images, frame) => {
    ctx.save();
    ctx.translate(
        player.location.x - player.size.w / 2,
        player.location.y - player.size.h
    );

    ctx.drawImage(images["bird"], 
        cellWith * frame, 0, 
        64, 64, 
        0, 0,
        player.size.w, player.size.h);
    ctx.restore();
};

export const drawPlayer = (ctx, player, images) => {
    const playerRect = {
        x: Math.floor(player.location.x - player.size.w / 2),
        y: Math.floor(player.location.y - player.size.h),
        w: Math.floor(player.size.w),
        h: Math.floor(player.size.h)
    };

    drawCollidedPlatforms(ctx, player.collisions);

    drawPlayerImg(ctx, player, images, player.frame);
    // ctx.fillStyle = player.onGround ? "red" : "darkred";
    // ctx.fillRect(playerRect.x, playerRect.y, playerRect.w, playerRect.h);

    drawPlayerCollidedSides(ctx, playerRect, player.collisions);
};

export const createPlayer = () => ({
    location: { x: -1500, y: 0 },
    velocity: { x: 0, y: 0 },
    movement: { direction: 0, speed: 0 },
    size: { w: 128, h: 128 },
    collisions: { top: false, bottom: false, left: false, right: false },
    nextJumpTime: 0,
    movementState: 0,
    timeWalking: 0,
    stoppingDirection: 0
});

const drawCollidedPlatforms = () => {
    // if (collisions) {
    //     let boxCounter = 0;
    //     for (let plat of collisions.all) {
    //         ctx.strokeStyle = `rgb(
    //             ${Math.floor(255 - 42.5 * boxCounter)},
    //             ${Math.floor(255 - 42.5)},
    //             0)`
    //         const w = plat.br.x - plat.tl.x;
    //         const h = plat.br.y - plat.tl.y;
    //         ctx.strokeRect(plat.tl.x, plat.tl.y, w, h);
    //         boxCounter++;
    //     }
    // }
};

const drawPlayerCollidedSides = (ctx, playerRect, collisions) => {
    if (collisions) {
        if (collisions.bottom) {
            drawLine(
                ctx,
                playerRect.x,
                playerRect.y + playerRect.h,
                playerRect.x + playerRect.w,
                playerRect.y + playerRect.h);
        }
        if (collisions.right) {
            drawLine(
                ctx,
                playerRect.x + playerRect.w,
                playerRect.y,
                playerRect.x + playerRect.w,
                playerRect.y + playerRect.h);
        }
    }
};