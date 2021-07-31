const timeBeforeTracking = 0;
const maxCameraYSpeed = 0;
const minTrackingDistance = 100;
const states = { normal: 1, waitingToTrack: 2, tracking: 3 };

const clamp = (x, min, max) => {
    if (x < min) {
        x = min
    }
    else if (x > max) {
        x = max;
    }
    return x;
}

export const updateCamera = (camera, player, t) => {
    camera.x = camera.w / 2 - player.location.x;

    if (!camera.timeLastInlineWithPlayer) {
        camera.timeLastInlineWithPlayer = t;
        camera.y = camera.h / 2 - player.location.y;
    }

    const desiredY = camera.h / 2 - player.location.y;
    if (camera.state === states.normal && Math.abs(desiredY - camera.y) > minTrackingDistance) {
        camera.state = states.waitingToTrack;
        camera.cameraDoneMoving = t + timeBeforeTracking;
    }
    else if (camera.state === states.waitingToTrack && t >= camera.cameraDoneMoving) {
        camera.state = states.tracking;
        camera.cameraDoneMoving = null;
        camera.playerTrackingStarted = t;
    }
    else if (camera.state === states.tracking) {
        const yDiff = camera.y - desiredY;
        if (yDiff === 0) {
            camera.state = states.normal;
        } else {
            const yOffset = clamp(yDiff, -maxCameraYSpeed, maxCameraYSpeed);
            camera.y -= yOffset;
        }
    }
};

export const createCamera = (canvas) => ({ 
        x: 0, 
        y: 0,
        w: canvas.width,
        h: canvas.height,
        state: states.normal
    });
