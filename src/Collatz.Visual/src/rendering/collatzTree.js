const next = (n) => 
    (n % 2 == 0)
        ? n / 2
        : (3 * n) + 1;

const hotpoInternal = (v, count, accume) => {
    if (v === 1)
    {
        return accume;
    }

    const nextNumber = next(v);
    if (!accume) {
        accume = [v];
    }
    accume.push(nextNumber)
    return hotpoInternal(nextNumber, count+1, accume);
}

export const create = () => ({
    tree: hotpoInternal(17, 0)
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
    drawRect(ctx,10, -50);
    const revBranch = [...branch];
    revBranch.reverse();
    let last = 1;
    for (let i = 0; i < revBranch.length; i++) {
        const current = revBranch[i];
        const diff = last - current;
        let x = 0;
        if (diff > 0) {
            x = 20; 
            //ctx.rotate(degToRad(315));
        } else if (diff < 0) {
            x = -20;
            //ctx.rotate(degToRad(225));
        }
        ctx.translate(x, 0);
        drawRect(ctx, 10, -50);
        ctx.translate(0, -50);
        last = current;
    }
    ctx.restore();

};

export const draw = (ctx, collatz) => {
    drawBranch(ctx, collatz.tree);
};