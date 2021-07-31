const keys = {
    c: 67,
    rightArrow: 39,
    leftArrow: 37,
    downArrow: 40,
    space: 32
};

const keyDownHandler = (e, keyState) => {
    if (e.keyCode === keys.space) {
        keyState.jumpPressed = true;
    }
};

const keyUpHandler = (e, keyState) => {
    if (e.keyCode === keys.space) {
        keyState.jumpPressed = false;
    }
};

export const startKeyboard = (doc) => {
    const keyState = {};
    doc.addEventListener("keydown", e => keyDownHandler(e, keyState));
    doc.addEventListener("keyup", e => keyUpHandler(e, keyState));
    return keyState;
};