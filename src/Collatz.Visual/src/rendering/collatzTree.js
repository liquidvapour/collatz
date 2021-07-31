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
    tree: hotpoInternal(16, 0)
});

export const draw = (ctx, collatz) => {
    console.log(collatz);
    ctx.save();
    ctx.fillStyle = "#F48C25";
    ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
    ctx.scale(10, 50);
    ctx.fillRect(0, 0, 1, 1);
    ctx.restore();
};