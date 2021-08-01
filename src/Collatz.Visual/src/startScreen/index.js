export const updateStart = (t, gameState) => {
    const sinT = Math.sin(t.time / 750);
    gameState.startBtnY = Math.floor((sinT * 80));
    
    
    return gameState.keyState.jumpPressed ? "game" : "start";
};

export const drawStart = (canvas, gameState, images) => {
    const gc = canvas.getContext("2d", { alpha: false });
    gc.save();
    gc.fillStyle = "#343434";
    gc.fillRect(0, 0, canvas.width, canvas.height);

    const spaceBtn = images["space-button"];

    console.log(`startBtnY: ${gameState.startBtnY}`);

    gc.drawImage(spaceBtn, canvas.width / 2 - (spaceBtn.width / 2), canvas.height / 2 - gameState.startBtnY);

    gc.restore();
};