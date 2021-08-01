import { randomBetween } from "../math"; 

const thinkTimeMs = 250;
const branchWidth = 5;
const branchHeight = 10;
const totalBranches = 10;

const next = (n) => 
    (n % 2 == 0)
        ? n / 2
        : (3 * n) + 1;

const hotpoInternal = (v, count, accume = [v]) => {

    if (v === 1)
    {
        return accume;
    }

    const nextNumber = next(v);
    accume.push(nextNumber)
    return hotpoInternal(nextNumber, count+1, accume);
}

const branchColor = {};

const getBranchColor = (n) => {
    if (!branchColor[n]) {
        branchColor[n] = randomColor();
    }

    return branchColor[n];
};

function* genBranches(start, count) {
    for (let i = start; i < start + count; i++) {
        yield ({ 
            parts: hotpoInternal(i, 0),
            color: getBranchColor(i)
        });
    }
}

export const create = (n = 1, numBranches) => ({
    tree: [...genBranches(n, numBranches)]
});

const drawRect = (ctx, w, h) => {
    ctx.save()   
    ctx.scale(w, h);
    ctx.fillRect(0, 0, 1, 1);
    ctx.restore();
};

const randomColor = () => `rgb(${randomBetween(0, 255)},${randomBetween(0, 255)},${randomBetween(0, 255)})`;

//const degToRad = (deg) => deg * Math.PI / 180;
const drawBranch = (ctx, branch) => {
    console.log(branch);
    ctx.save();
    ctx.fillStyle = branch.color;
    ctx.translate(ctx.canvas.width/2, ctx.canvas.height);
    const revBranch = [...branch.parts];

    let last = 1;
    for (let i = 0; i < revBranch.length; i++) {
        const current = revBranch[i];
        const diff = last - current;
        console.log(`diff: ${diff}`);
        let x = 0;
        if (diff > 0) {
            x = -branchWidth; 
        } else if (diff < 0) {
            x = branchWidth;
        }
        ctx.translate(x, 0);
        drawRect(ctx, branchWidth, -(branchHeight));
        ctx.translate(0, -(branchHeight));
        last = current;
    }
    ctx.restore();
};

let currentN = 1;

const think = (collatz) => {
    collatz.tree = create(currentN, totalBranches).tree;
    currentN += 1;
}; 

let nextThink = 0;

export const draw = (ctx, collatz, t) => {
    if (t.time > nextThink) {
        think(collatz);
        nextThink = t.time + thinkTimeMs;
    }

    for (let i = 0; i < collatz.tree.length; i++) {
        drawBranch(ctx, collatz.tree[i]);
    }
};