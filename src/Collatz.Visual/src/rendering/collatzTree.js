const next = (n) => 
    (n % 2 == 0)
        ? n / 2
        : (3 * n) + 1;

const hotpoInternal = (v, count, accume) => {
    if (!accume) {
        accume = [v];
    }

    if (v === 1)
    {
        return accume;
    }

    const nextNumber = next(v);
    accume.push(nextNumber)
    return hotpoInternal(nextNumber, count+1, accume);
}

function* genBranches(start, count) {
    for (let i = start; i < start + count; i++) {
        yield hotpoInternal(i, 0);
    }
};

export const create = (n = 1) => ({
    tree: [...genBranches(n, 1)]
});

const drawRect = (ctx, w, h) => {
    ctx.save()   
    ctx.scale(w, h);
    ctx.fillRect(0, 0, 1, 1);
    ctx.restore();
};

//const degToRad = (deg) => deg * Math.PI / 180;

const drawBranch = (ctx, branch) => {
    console.log(branch);
    ctx.save();
    ctx.fillStyle = "#F48C25";
    ctx.translate(ctx.canvas.width/2, ctx.canvas.height);
    const revBranch = [...branch];
    revBranch.reverse();
    let last = 1;
    for (let i = 0; i < revBranch.length; i++) {
        const current = revBranch[i];
        const diff = last - current;
        let x = 0;
        if (diff > 0) {
            x = 5; 
            //ctx.rotate(degToRad(315));
        } else if (diff < 0) {
            x = -5;
            //ctx.rotate(degToRad(225));
        }
        ctx.translate(x, 0);
        drawRect(ctx, 5, -10);
        ctx.translate(0, -10);
        last = current;
    }
    ctx.restore();
};

let currentN = 1;

const think = (collatz) => {
    collatz.tree = create(currentN).tree;
    currentN += 1;
}; 

let nextThink = 0;
const thinkTimeMs = 100;

export const draw = (ctx, collatz, t) => {
    if (t.time > nextThink) {
        think(collatz);
        nextThink = t.time + thinkTimeMs;
    }

    for (let i = 0; i < collatz.tree.length; i++) {
        drawBranch(ctx, collatz.tree[i]);
    }
};