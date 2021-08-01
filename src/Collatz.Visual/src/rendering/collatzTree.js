import { randomColor, degToRad } from "../math";

const thinkTimeMs = 250;
const branchWidth = 5;
const branchHeight = 20;
const totalBranches = 25;
let rotateAmount = 90;
const straightenFactor = 1;

let currentN = 1;

const next = (n) =>
    (n % 2 == 0)
        ? n / 2
        : (3 * n) + 1;

const hotpoInternal = (n, accume = [n]) => {
    /*eslint-disable no-constant-condition*/
    while (true) {

        if (n === 1) {
            return accume;
        }

        const nn = next(n);
        n = nn;
        accume.push(nn)
    }
    /*eslint-enable no-constant-condition*/
}

const branchColorCache = {};

const getBranchColor = (n) => {
    if (!branchColorCache[n]) {
        branchColorCache[n] = randomColor();
        const colorKeys = Object.keys(branchColorCache);
        if (colorKeys.length > totalBranches) {
            delete branchColorCache[colorKeys[0]];
        }
    }

    return branchColorCache[n];
};

function* genBranches(start, count) {
    for (let i = start; i < start + count; i++) {
        yield ({
            parts: hotpoInternal(i),
            color: getBranchColor(i)
        });
    }
}

export const create = (n = 1, numBranches) => ({
    tree: [...genBranches(n, numBranches)],
    n
});

const drawBranch = (ctx, branch) => {
    ctx.save();
    ctx.strokeStyle = branch.color;
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height/2);
    const revBranch = [...branch.parts];

    let last = 1;
    ctx.beginPath();
    ctx.lineWidth = branchWidth;
    let points = 0;
    for (let i = 0; i < revBranch.length; i++) {
        const current = revBranch[i];
        const diff = last - current;
        console.log(`diff: ${diff}`);
        if (diff > 0) {
            ctx.rotate(degToRad(rotateAmount / straightenFactor));
        } else if (diff < 0) {
            ctx.rotate(degToRad(-rotateAmount));
        }
        //drawRect(ctx, branchWidth, -(branchHeight));
        ctx.lineTo(0, -branchHeight);
        ctx.translate(0, -(branchHeight));
        last = current;
        points++;
    }
    ctx.stroke();
    ctx.restore();
    return points;
};


const think = (collatz) => {
    const newCollatz = create(currentN, totalBranches);
    collatz.tree = newCollatz.tree;
    collatz.n = newCollatz.n;
    currentN += 1;
};

let nextThink = 0;

export const draw = (ctx, collatz, t) => {
    rotateAmount -= 0.005 * t.dt;
    if (rotateAmount < -90) {
        rotateAmount = 90;
    }
    if (t.time > nextThink) {
        think(collatz);
        nextThink = t.time + thinkTimeMs;
    }

    let totalPoints = 0;
    for (let i = 0; i < collatz.tree.length; i++) {
        totalPoints += drawBranch(ctx, collatz.tree[i]);
    }
    collatz.points = totalPoints;
    collatz.rotateAmount = rotateAmount;
};